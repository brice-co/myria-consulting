"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettingsStore } from "@/app/(tools)/business-intelligence/lib/stores/settings-store"
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { apiKey, model, setApiKey, setModel } = useSettingsStore()
  const [localApiKey, setLocalApiKey] = useState(apiKey)
  const [localModel, setLocalModel] = useState(model)
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const models = [
    { value: "gpt-5-mini", label: "GPT-5o Mini" },
    { value: "gpt-5-nano", label: "GPT-5o Nano" },
    { value: "gpt-4.1-mini", label: "GPT-4.1 Mini" },
    { value: "gpt-4-mini", label: "GPT-4 Mini" },
    
  ]

  const handleSave = () => {
    setApiKey(localApiKey)
    setModel(localModel)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => router.push("/")} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure your AI Toolkit preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>OpenAI Configuration</CardTitle>
            <CardDescription>
              Set up your OpenAI API key and preferred model. Your API key is stored locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Get your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  OpenAI Platform
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Default Model</Label>
              <Select value={localModel} onValueChange={setLocalModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} className="w-full" disabled={!localApiKey}>
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Saved!" : "Save Settings"}
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>🔒 Your API key is stored locally in your browser and never sent to our servers.</p>
              <p>🌐 API calls are made directly from your browser to OpenAI.</p>
              <p>💾 All data is stored locally using IndexedDB and localStorage.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
