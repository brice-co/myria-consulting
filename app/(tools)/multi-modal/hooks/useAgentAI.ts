"use client"

import { useCallback, useRef } from "react"
import { useVoiceAgentStore } from "../stores/voiceAgentStore"
import { OpenUrlSchema, SendEmailSchema, WebSearchSchema } from "../lib/types"
import type { AIMessage, ToolCall } from "../lib/types"
import { toast } from "sonner"

interface UseAgentAIOptions {
  onResponse: (text: string) => void
  onError?: (error: string) => void
}

const SYSTEM_PROMPT = `You are an AI voice assistant with multi-agent capabilities. You orchestrate tasks using tools.

Available tools:
1. open_url - Opens a URL in the user's browser tab
2. send_email - Sends an email via Resend to a recipient
3. web_search - Searches the web and returns summarized results

When the user asks for parallel tasks (e.g. "search X and Y in parallel, then email me"), you MUST call multiple tools in a single response using multiple tool_calls.

For email sending:
- If the user provides a recipient and subject but no body, YOU MUST compose a professional, well-written email body yourself based on the subject and conversation context.
- If the user provides search results to include, incorporate them into the email body in a clean, readable format.
- Always confirm the recipient, subject, and a brief summary of the email content before sending. Ask only once, then proceed.
- Write the email body in clean HTML with proper formatting (paragraphs, bullet points if needed).

For combined requests:
- Execute search queries as separate parallel tool calls
- After receiving search results, compose a summary and use send_email to deliver it
- Always confirm what you did

Keep responses concise and conversational since they will be spoken aloud.`;


export function useAgentAI({ onResponse, onError }: UseAgentAIOptions) {

  const messagesRef = useRef<AIMessage[]>([
    { role: "system", content: SYSTEM_PROMPT },
  ])

  const store = useVoiceAgentStore()

  /**
   * TOOL EXECUTION
   */
  const executeToolCall = useCallback(
    async (toolCall: {
      id: string
      function: { name: string; arguments: string }
    }): Promise<string> => {

      const { name, arguments: argsStr } = toolCall.function
      const args = JSON.parse(argsStr)

      const tc: ToolCall = {
        id: toolCall.id,
        name: name as ToolCall["name"],
        arguments: args,
        status: "running",
        agentType:
          name === "web_search"
            ? "search"
            : name === "send_email"
            ? "email"
            : "browser",
      }

      store.addToolCall(tc)

      try {
        switch (name) {

          /**
           * OPEN URL
           */
          case "open_url": {
            const { url } = OpenUrlSchema.parse(args)

            window.open(url, "_blank")

            store.updateToolCall(toolCall.id, {
              status: "completed",
              result: `Opened ${url}`,
            })

            return `Opened ${url} in a new tab`
          }

          /**
           * SEND EMAIL
           */
          case "send_email": {
            const validated = SendEmailSchema.parse(args)

            const res = await fetch("/api/tools/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(validated),
            })

            if (!res.ok) throw new Error("Email API failed")

            const data = await res.json()

            store.updateToolCall(toolCall.id, {
              status: "completed",
              result: `Email sent to ${validated.to}`,
            })

            return data.message || `Email sent to ${validated.to}`
          }

          /**
           * WEB SEARCH
           */
          case "web_search": {
            const { query } = WebSearchSchema.parse(args)

            const res = await fetch("/api/tools/web-search", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query }),
            })

            if (!res.ok) throw new Error("Search API failed")

            const data = await res.json()

            store.updateToolCall(toolCall.id, {
              status: "completed",
              result: data.summary,
            })

            return data.summary || "No results found"
          }

          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (err: any) {

        store.updateToolCall(toolCall.id, {
          status: "error",
          result: err.message,
        })

        return `Error executing ${name}: ${err.message}`
      }
    },
    [store]
  )

  /**
   * SEND MESSAGE
   */
  const sendMessage = useCallback(
    async (text: string) => {

      messagesRef.current.push({ role: "user", content: text })
      store.setProcessing(true)

      try {

        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messagesRef.current,
          }),
        })

        if (!res.ok) throw new Error("Agent API failed")

        const data = await res.json()

        const choice = data.choices?.[0]?.message

        if (!choice) throw new Error("No response from AI")

        /**
         * TOOL CALL FLOW
         */
        if (choice.tool_calls?.length) {

          messagesRef.current.push({
            role: "assistant",
            content: choice.content || "",
            tool_calls: choice.tool_calls,
          })

          const results = await Promise.all(
            choice.tool_calls.map((tc: any) => executeToolCall(tc))
          )

          choice.tool_calls.forEach((tc: any, i: number) => {
            messagesRef.current.push({
              role: "tool",
              tool_call_id: tc.id,
              content: results[i],
            })
          })

          /**
           * FOLLOW UP LLM CALL
           */

          const followUp = await fetch("/api/agent/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: messagesRef.current,
            }),
          })

          const followData = await followUp.json()

          const finalMsg =
            followData?.choices?.[0]?.message?.content || "Done."

          messagesRef.current.push({
            role: "assistant",
            content: finalMsg,
          })

          store.setProcessing(false)

          onResponse(finalMsg)

        } else if (choice.content) {

          messagesRef.current.push({
            role: "assistant",
            content: choice.content,
          })

          store.setProcessing(false)

          onResponse(choice.content)
        }

      } catch (err: any) {

        console.error("Agent AI error:", err)

        store.setProcessing(false)

        toast("AI Error")

        onError?.(err.message)
      }
    },
    [store, executeToolCall, onResponse, onError]
  )

  const reset = useCallback(() => {
    messagesRef.current = [{ role: "system", content: SYSTEM_PROMPT }]
  }, [])

  return { sendMessage, reset }
}