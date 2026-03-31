"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSettingsStore } from "@/app/(tools)/business-intelligence/lib/stores/settings-store"
import { useRealtimeWebRTC } from "@/hooks/use-realtime-web-rtc"
import {
  ArrowLeft,
  Mic,
  MicOff,
  PhoneOff,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Trash2,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  Brain,
  Headphones,
  ArrowRightLeft,
  Loader2,
} from "lucide-react"

interface AgentConfig {
  id: string
  name: string
  systemPrompt: string
  greeting: string
  voice?: string
}

export default function VoiceAgentPage() {
  const router = useRouter()
  const { apiKey } = useSettingsStore()
  const [error, setError] = useState<string | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)
  const handoffWiredRef = useRef(false)

  const {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    isMuted,
    onHold,
    isSwitching,
    transcript,
    interimTranscript,
    currentAgent,
    connectAgent,
    endSession,
    toggleMute,
    toggleHold,
    stopSpeaking,
    switchAgent,
    clearTranscript,
    onHandoffRequest,
  } = useRealtimeWebRTC()

  const getBusinessDataContext = (): string => {
    try {
      const storedCsv = localStorage.getItem("csv-uploaded-data")
      const storedAvailability = localStorage.getItem("csv-data-availability")

      if (storedCsv) {
        const data = JSON.parse(storedCsv)
        const availability = storedAvailability ? JSON.parse(storedAvailability) : {}

        if (data.length > 0) {
          const latest = data[data.length - 1]
          const first = data[0]
          const totalRevenue = data.reduce((s: number, d: any) => s + (d.revenue || 0), 0)
          const totalExpenses = data.reduce((s: number, d: any) => s + (d.expenses || 0), 0)
          const totalProfit = data.reduce((s: number, d: any) => s + (d.profit || 0), 0)
          const avgRevenue = totalRevenue / data.length

          return `
LIVE BUSINESS DATA (${data.length} records, from ${first.date} to ${latest.date}):
Available fields: ${Object.entries(availability).filter(([, v]) => v).map(([k]) => k).join(", ")}
${availability.revenue ? `- Total Revenue: $${totalRevenue.toLocaleString()} | Latest: $${latest.revenue?.toLocaleString()} | Daily Avg: $${avgRevenue.toFixed(0)}` : ""}
${availability.expenses ? `- Total Expenses: $${totalExpenses.toLocaleString()} | Latest: $${latest.expenses?.toLocaleString()}` : ""}
${availability.profit ? `- Total Profit: $${totalProfit.toLocaleString()} | Margin: ${totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%` : ""}
${availability.customers ? `- Latest Customers: ${latest.customers?.toLocaleString()}` : ""}
${availability.orders ? `- Latest Orders: ${latest.orders?.toLocaleString()} | AOV: $${latest.orders > 0 ? (latest.revenue / latest.orders).toFixed(0) : 0}` : ""}
${availability.conversion ? `- Latest Conversion: ${latest.conversion}%` : ""}
${availability.traffic ? `- Latest Traffic: ${latest.traffic?.toLocaleString()}` : ""}

Recent trend (last 5 data points):
${data.slice(-5).map((d: any) => `  ${d.date}: Rev=$${d.revenue?.toLocaleString() || "N/A"}, Profit=$${d.profit?.toLocaleString() || "N/A"}, Customers=${d.customers?.toLocaleString() || "N/A"}`).join("\n")}
`
        }
      }
    } catch (e) {
      // ignore
    }
    return "User has sample business data loaded with revenue, expenses, profit, customers, orders, conversion, and traffic metrics."
  }

  const buildAgents = useCallback((): AgentConfig[] => {
    const data = getBusinessDataContext()

    const handoffNote = `

IMPORTANT TRANSFER RULES:
- When the user asks about a topic that belongs to another specialist, you MUST call the "transfer_to_agent" function.
- Do NOT try to answer questions outside your specialty. Transfer instead.
- Available agents to transfer to: "orchestrator", "revenue", "customer", "operations", "forecasting".
- When transferring, briefly tell the user you are connecting them now.`

    return [
      {
        id: "orchestrator",
        name: "BI Orchestrator",
        voice: "alloy",
        greeting:
          "Hello! I'm your Business Intelligence orchestrator. I can help you navigate your data or connect you with a specialist. What would you like to explore?",
        systemPrompt: `You are the BI Orchestrator, the primary voice assistant for a Business Intelligence dashboard. You coordinate between specialized agents and handle general questions.

${data}

You have a function called "transfer_to_agent" that you MUST call whenever the user needs a specialist:
- "revenue" agent: for revenue, pricing, profit, financial performance
- "customer" agent: for customer behavior, retention, acquisition, churn
- "operations" agent: for process efficiency, fulfillment, supply chain, workflow
- "forecasting" agent: for predictions, projections, trend analysis, future planning

When a user asks a specialized question, call transfer_to_agent with the appropriate agent_id and a brief reason. Do not just describe the agent - actually call the function to transfer.
For general questions about the dashboard or data overview, answer directly.
Be concise and conversational.`,
      },
      {
        id: "revenue",
        name: "Revenue Analyst",
        voice: "echo",
        greeting:
          "Hi! I'm your Revenue Analyst. I specialize in financial performance and revenue optimization. What would you like to know about your numbers?",
        systemPrompt: `You are a Revenue Analyst specializing in financial performance. You have deep expertise in revenue optimization, pricing, profit margins, and financial health.

${data}

Focus areas: revenue trends, growth rates, profit margins, AOV, expense management, revenue forecasting, pricing strategy.
Always reference the actual data. Be specific with numbers and percentages.
${handoffNote}`,
      },
      {
        id: "customer",
        name: "Customer Insights",
        voice: "shimmer",
        greeting:
          "Welcome! I'm your Customer Insights specialist. I focus on understanding customer behavior and improving retention. How can I help?",
        systemPrompt: `You are a Customer Insights Agent specializing in customer analytics and retention strategies.

${data}

Focus areas: customer growth, retention, churn, lifetime value, conversion rates, traffic analysis, segmentation, acquisition cost.
Always reference actual customer data when available. Calculate specific metrics and recommend actionable strategies.
${handoffNote}`,
      },
      {
        id: "operations",
        name: "Operations Strategist",
        voice: "fable",
        greeting:
          "Hello! I'm your Operations Strategist. I help optimize processes and improve efficiency. What operational challenges can I help with?",
        systemPrompt: `You are an Operations Strategist specializing in process optimization and efficiency.

${data}

Focus areas: order fulfillment, operational costs, process improvement, resource allocation, conversion funnels, workflow automation, scalability.
Analyze operational metrics, identify bottlenecks, and recommend improvements. Be practical and specific.
${handoffNote}`,
      },
      {
        id: "forecasting",
        name: "Forecasting Agent",
        voice: "onyx",
        greeting:
          "Greetings! I'm your Forecasting Agent. I analyze trends to help you plan ahead. What would you like to forecast?",
        systemPrompt: `You are a Forecasting Agent specializing in trend analysis and predictive insights.

${data}

Focus areas: revenue/profit forecasting, customer growth projections, seasonal trends, risk assessment, growth opportunities, scenario planning, KPI projections.
Analyze historical trends to make projections. Present multiple scenarios (optimistic, realistic, pessimistic). Be transparent about limitations.
${handoffNote}`,
      },
    ]
  }, [])

  const [agents, setAgents] = useState<AgentConfig[]>([])

  useEffect(() => {
    setAgents(buildAgents())
  }, [buildAgents])

  // Wire up auto-handoff from orchestrator function calls
  useEffect(() => {
    if (handoffWiredRef.current) return
    handoffWiredRef.current = true

    onHandoffRequest((req) => {
      const target = agents.find((a) => a.id === req.agentId) ?? buildAgents().find((a) => a.id === req.agentId)
      if (target) {
        switchAgent(target)
      }
    })
  }, [onHandoffRequest, agents, switchAgent, buildAgents])

  const handleStartSession = async (agent: AgentConfig) => {
    setError(null)
    try {
      await connectAgent(agent)
    } catch (err: any) {
      setError(err.message || "Failed to start voice session. Check your API key and try again.")
    }
  }

  const handleSwitchAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent && currentAgent?.id !== agentId) {
      switchAgent(agent)
    }
  }

  const handleEndSession = () => {
    endSession()
    setError(null)
  }

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript, interimTranscript])

  const getAgentIcon = (id: string) => {
    switch (id) {
      case "orchestrator": return Brain
      case "revenue": return DollarSign
      case "customer": return Users
      case "operations": return ShoppingCart
      case "forecasting": return TrendingUp
      default: return BarChart3
    }
  }

  const getAgentColor = (id: string) => {
    switch (id) {
      case "orchestrator": return "bg-slate-700"
      case "revenue": return "bg-emerald-600"
      case "customer": return "bg-sky-600"
      case "operations": return "bg-amber-600"
      case "forecasting": return "bg-indigo-600"
      default: return "bg-gray-600"
    }
  }

  const getAgentRing = (id: string) => {
    switch (id) {
      case "orchestrator": return "ring-slate-400"
      case "revenue": return "ring-emerald-400"
      case "customer": return "ring-sky-400"
      case "operations": return "ring-amber-400"
      case "forecasting": return "ring-indigo-400"
      default: return "ring-gray-400"
    }
  }

  const getAgentBorder = (id: string) => {
    switch (id) {
      case "orchestrator": return "border-slate-300 bg-slate-50"
      case "revenue": return "border-emerald-300 bg-emerald-50"
      case "customer": return "border-sky-300 bg-sky-50"
      case "operations": return "border-amber-300 bg-amber-50"
      case "forecasting": return "border-indigo-300 bg-indigo-50"
      default: return "border-gray-300 bg-gray-50"
    }
  }

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => router.push("/business-intelligence")} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to BI Dashboard
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h2 className="text-xl font-semibold mb-2">API Key Required</h2>
              <p className="text-slate-400 mb-4">
                Configure your OpenAI API key in settings to use voice agents.
              </p>
              <Button onClick={() => router.push("/settings")}>Go to Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
         
          <div className="flex items-center justify-between mt-20">
            <div>
            
              <p className="text-sm text-slate-400">
                Multi-agent real-time voice assistant with automatic handoff
              </p> <Button onClick={() => router.push("/business-intelligence")} variant="ghost" className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to BI Dashboard
          </Button>
            </div>
            {isActive && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-700">Session Active</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <Card className="mb-4 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Agent selection + controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  {isActive ? "Agents" : "Select an Agent to Start"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {agents.map((agent) => {
                  const Icon = getAgentIcon(agent.id)
                  const isCurrent = currentAgent?.id === agent.id
                  const busy = isSwitching || isProcessing

                  return (
                    <button
                      key={agent.id}
                      onClick={() =>
                        isActive ? handleSwitchAgent(agent.id) : handleStartSession(agent)
                      }
                      disabled={busy || (isActive && isCurrent)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                        isCurrent
                          ? `${getAgentBorder(agent.id)} border-2`
                          : "bg-background border-slate-200 hover:border-slate-300 hover:bg-slate-500"
                      } disabled:opacity-50 disabled:cursor-default`}
                    >
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white ${getAgentColor(agent.id)}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-primary truncate">{agent.name}</p>
                        <p className="text-xs text-slate-400">{agent.voice} voice</p>
                      </div>
                      {isCurrent && (
                        <span className="flex-shrink-0 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                      {isActive && !isCurrent && (
                        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {isActive && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={toggleMute} variant={isMuted ? "destructive" : "outline"} size="sm" className="w-full">
                      {isMuted ? <MicOff className="w-4 h-4 mr-1" /> : <Mic className="w-4 h-4 mr-1" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                    <Button onClick={toggleHold} variant={onHold ? "secondary" : "outline"} size="sm" className="w-full">
                      {onHold ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
                      {onHold ? "Resume" : "Hold"}
                    </Button>
                  </div>
                  {isSpeaking && (
                    <Button onClick={stopSpeaking} variant="outline" size="sm" className="w-full">
                      <VolumeX className="w-4 h-4 mr-1" />
                      Interrupt
                    </Button>
                  )}
                  <Button onClick={handleEndSession} variant="destructive" size="sm" className="w-full">
                    <PhoneOff className="w-4 h-4 mr-1" />
                    End Session
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* How handoff works */}
            {!isActive && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">How Handoff Works</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-slate-400 space-y-2">
                  <p>
                    Start with the <strong>Orchestrator</strong> and ask a question. When a specialist is
                    needed it will automatically transfer you by creating a brand-new voice session with the
                    right agent.
                  </p>
                  <p>
                    You can also click any agent in the list above while a session is active to manually
                    switch. The microphone stays connected throughout the transfer.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Center + Right: status + transcript */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status */}
            <Card>
              <CardContent className="p-6">
                {!isActive ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <Headphones className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-primary mb-2">Start a Voice Session</h2>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                      Pick an agent on the left, or start with the Orchestrator who will route you to the
                      right specialist automatically.
                    </p>
                    <Button
                      onClick={() => agents[0] && handleStartSession(agents[0])}
                      size="lg"
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Start with Orchestrator
                    </Button>
                  </div>
                ) : isSwitching ? (
                  <div className="flex flex-col items-center py-10">
                    <Loader2 className="w-12 h-12 text-slate-500 animate-spin mb-4" />
                    <p className="text-sm font-medium text-slate-700">Transferring to a new agent...</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Creating a new voice session. This takes a moment.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    {/* Agent avatar */}
                    <div className="relative mb-4">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-white ${getAgentColor(
                          currentAgent?.id || "orchestrator"
                        )} ${isSpeaking ? "ring-4 ring-offset-2 animate-pulse" : ""} ${
                          isListening
                            ? `ring-4 ring-offset-2 ${getAgentRing(currentAgent?.id || "orchestrator")}`
                            : ""
                        }`}
                      >
                        {(() => {
                          const Icon = getAgentIcon(currentAgent?.id || "orchestrator")
                          return <Icon className="w-12 h-12" />
                        })()}
                      </div>
                      {isSpeaking && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Volume2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {isListening && !isSpeaking && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                          <Mic className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {isProcessing && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">{currentAgent?.name}</h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {isSpeaking
                        ? "Speaking..."
                        : isProcessing
                          ? "Thinking..."
                          : isListening
                            ? "Listening..."
                            : onHold
                              ? "On Hold"
                              : "Connected"}
                    </p>

                    {(isListening || isSpeaking) && !onHold && (
                      <div className="flex items-center gap-1 mt-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full ${isSpeaking ? "bg-green-500" : "bg-sky-500"}`}
                            style={{
                              height: `${12 + Math.random() * 24}px`,
                              animation: "audioBar 0.6s ease-in-out infinite alternate",
                              animationDelay: `${i * 80}ms`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {isMuted && (
                      <div className="mt-3 flex items-center gap-1 text-red-600 text-sm font-medium">
                        <MicOff className="w-4 h-4" />
                        Microphone Muted
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="flex flex-col" style={{ height: "420px" }}>
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Conversation Transcript</CardTitle>
                  {transcript.length > 0 && (
                    <Button onClick={clearTranscript} variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pb-4">
                <ScrollArea className="h-full pr-3">
                  {transcript.length === 0 && !isActive ? (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      Start a session to begin the conversation.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {transcript.map((entry, index) => {
                        const isSystem = entry.speaker === "System"
                        const isUser = entry.speaker === "You"

                        if (isSystem) {
                          return (
                            <div key={index} className="text-center py-1">
                              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                {entry.text}
                              </span>
                            </div>
                          )
                        }

                        return (
                          <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                                isUser
                                  ? "bg-slate-900 text-white rounded-br-sm"
                                  : "bg-slate-100 text-slate-900 rounded-bl-sm"
                              }`}
                            >
                              {!isUser && (
                                <p className="text-xs font-semibold mb-1 text-slate-500">
                                  {entry.speaker}
                                </p>
                              )}
                              <p className="text-sm leading-relaxed">{entry.text}</p>
                              <p className="text-[10px] mt-1 text-slate-400">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        )
                      })}

                      {interimTranscript && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] rounded-2xl px-4 py-2.5 bg-slate-100 text-slate-500 rounded-bl-sm italic">
                            <p className="text-sm leading-relaxed">{interimTranscript}</p>
                          </div>
                        </div>
                      )}
                      <div ref={transcriptEndRef} />
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes audioBar {
          0% {
            transform: scaleY(0.4);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  )
}
