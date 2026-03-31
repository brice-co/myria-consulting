"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDataSourcesStore, type DataSource } from "@/app/(tools)/business-intelligence/lib/stores/data-sources-store"
import { DataConnector, API_TEMPLATES } from "@/app/(tools)/business-intelligence/lib/data-connectors"
import {
  ArrowLeft,
  Plus,
  Database,
  Globe,
  FileText,
  Webhook,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Play,
  Settings,
} from "lucide-react"

export default function DataSourcesPage() {
  const router = useRouter()
  const { dataSources, addDataSource, updateDataSource, removeDataSource, setActiveDataSource } = useDataSourcesStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSource, setEditingSource] = useState<string | null>(null)
  const [testingConnection, setTestingConnection] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<DataSource>>({
    name: "",
    type: "api",
    status: "disconnected",
    config: {
      url: "",
      apiKey: "",
      headers: {},
      method: "GET",
    },
    mapping: {
      date: "",
      revenue: "",
      expenses: "",
      customers: "",
      orders: "",
    },
  })

  const handleAddDataSource = async () => {
    if (!formData.name || !formData.type) {
      alert("Please fill in the required fields (Name and Type)")
      return
    }

    const newDataSource = {
      name: formData.name,
      type: formData.type,
      status: "disconnected" as const,
      config: formData.config || {},
      mapping: formData.mapping || {},
    }

    addDataSource(newDataSource)
    setShowAddForm(false)
    setFormData({
      name: "",
      type: "api",
      status: "disconnected",
      config: {
        url: "",
        apiKey: "",
        headers: {},
        method: "GET",
      },
      mapping: {
        date: "",
        revenue: "",
        expenses: "",
        customers: "",
        orders: "",
      },
    })
  }

  const handleTestConnection = async (dataSource: DataSource) => {
    setTestingConnection(dataSource.id)
    try {
      const isConnected = await DataConnector.testConnection(dataSource)
      updateDataSource(dataSource.id, {
        status: isConnected ? "connected" : "error",
        config: {
          ...dataSource.config,
          lastSync: new Date().toISOString(),
        },
      })
    } catch (error) {
      updateDataSource(dataSource.id, { status: "error" })
    } finally {
      setTestingConnection(null)
    }
  }

  const handleSyncData = async (dataSource: DataSource) => {
    updateDataSource(dataSource.id, { status: "syncing" })
    try {
      const data = await DataConnector.fetchData(dataSource)
      updateDataSource(dataSource.id, {
        status: "connected",
        config: {
          ...dataSource.config,
          lastSync: new Date().toISOString(),
        },
      })
      // Store the data in localStorage for the BI dashboard
      localStorage.setItem(`business-data-${dataSource.id}`, JSON.stringify(data))
      alert(`Successfully synced ${data.length} records`)
    } catch (error) {
      updateDataSource(dataSource.id, { status: "error" })
      alert(`Sync failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const loadTemplate = (templateKey: string) => {
    const template = API_TEMPLATES[templateKey as keyof typeof API_TEMPLATES]
    if (template) {
      setFormData({
        name: template.name,
        type: template.type,
        config: { ...template.config },
        mapping: { ...template.mapping },
        status: "disconnected",
      })
    }
  }

  const getStatusIcon = (status: DataSource["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "syncing":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getTypeIcon = (type: DataSource["type"]) => {
    switch (type) {
      case "api":
        return <Globe className="w-5 h-5" />
      case "database":
        return <Database className="w-5 h-5" />
      case "file":
        return <FileText className="w-5 h-5" />
      case "webhook":
        return <Webhook className="w-5 h-5" />
      default:
        return <Database className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => router.push("/business-intelligence")} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to BI Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Data Sources</h1>
              <p className="text-gray-300">Connect to live data sources and APIs</p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Data Source
            </Button>
          </div>
        </div>

        {/* Add Data Source Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Data Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data Source Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Business API"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as DataSource["type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">REST API</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* API Templates */}
              <div>
                <label className="block text-sm font-medium mb-2">Quick Templates</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(API_TEMPLATES).map(([key, template]) => (
                    <Button key={key} variant="outline" size="sm" onClick={() => loadTemplate(key)} className="text-xs">
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>

              {formData.type === "api" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">API URL</label>
                    <Input
                      value={formData.config?.url || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: { ...formData.config, url: e.target.value },
                        })
                      }
                      placeholder="https://api.example.com/data"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <Input
                      type="password"
                      value={formData.config?.apiKey || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: { ...formData.config, apiKey: e.target.value },
                        })
                      }
                      placeholder="Your API key"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Headers (JSON)</label>
                    <Textarea
                      value={JSON.stringify(formData.config?.headers || {}, null, 2)}
                      onChange={(e) => {
                        try {
                          const headers = e.target.value.trim() ? JSON.parse(e.target.value) : {}
                          setFormData({
                            ...formData,
                            config: { ...formData.config, headers },
                          })
                        } catch (error) {
                          // Keep the text as-is if JSON is invalid, don't update the state
                          console.warn("Invalid JSON in headers field")
                        }
                      }}
                      placeholder='{"Authorization": "Bearer token"}'
                      rows={3}
                    />
                  </div>
                </>
              )}

              {formData.type === "database" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Host</label>
                      <Input
                        value={formData.config?.database?.host || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: {
                              ...formData.config,
                              database: { ...formData.config?.database, host: e.target.value },
                            },
                          })
                        }
                        placeholder="localhost"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Port</label>
                      <Input
                        type="number"
                        value={formData.config?.database?.port || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            config: {
                              ...formData.config,
                              database: { ...formData.config?.database, port: Number.parseInt(e.target.value) },
                            },
                          })
                        }
                        placeholder="5432"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Database Name</label>
                    <Input
                      value={formData.config?.database?.database || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          config: {
                            ...formData.config,
                            database: { ...formData.config?.database, database: e.target.value },
                          },
                        })
                      }
                      placeholder="business_db"
                    />
                  </div>
                </>
              )}

              {/* Field Mapping */}
              <div>
                <label className="block text-sm font-medium mb-2">Field Mapping</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["date", "revenue", "expenses", "customers", "orders"].map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-gray-500 mb-1 capitalize">{field}</label>
                      <Input
                        
                        value={formData.mapping?.[field] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mapping: { ...formData.mapping, [field]: e.target.value },
                          })
                        }
                        placeholder={`${field}_field`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAddDataSource}>Add Data Source</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Sources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((dataSource) => (
            <Card key={dataSource.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(dataSource.type)}
                    <CardTitle className="text-lg">{dataSource.name}</CardTitle>
                  </div>
                  {getStatusIcon(dataSource.status)}
                </div>
                <p className="text-sm text-gray-400 capitalize">{dataSource.type} Connection</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="capitalize font-medium">{dataSource.status}</span>
                  </div>
                  {dataSource.config.lastSync && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Sync:</span>
                      <span className="text-xs">{new Date(dataSource.config.lastSync).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestConnection(dataSource)}
                    disabled={testingConnection === dataSource.id}
                  >
                    {testingConnection === dataSource.id ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3 mr-1" />
                    )}
                    Test
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSyncData(dataSource)}
                    disabled={dataSource.status !== "connected"}
                  >
                    Sync
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setActiveDataSource(dataSource.id)}>
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => removeDataSource(dataSource.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                {dataSource.type === "api" && dataSource.config.url && (
                  <div className="text-xs text-gray-400 bg-background p-2 rounded">
                    <strong>URL:</strong> {dataSource.config.url.substring(0, 50)}...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {dataSources.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Database className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Data Sources</h3>
              <p className="text-gray-400 mb-4">Connect your first data source to get started with live data.</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Data Source
              </Button>
            </div>
          )}
        </div>

        {/* Integration Examples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Popular Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(API_TEMPLATES).map(([key, template]) => (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <h4 className="font-medium">{template.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Connect to {template.name} to automatically sync your business data.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => loadTemplate(key)}>
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Expected Data Format</h4>
              <pre className="bg-background p-3 rounded text-sm overflow-auto">
                {JSON.stringify(
                  {
                    data: [
                      {
                        date: "2024-01-01",
                        revenue: 50000,
                        expenses: 30000,
                        customers: 1250,
                        orders: 890,
                        traffic: 28000,
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">Field Mapping Examples</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>
                  • <strong>date:</strong> "created_at", "date", "timestamp"
                </li>
                <li>
                  • <strong>revenue:</strong> "total_sales", "revenue", "amount"
                </li>
                <li>
                  • <strong>customers:</strong> "customer_count", "users", "customers"
                </li>
                <li>
                  • <strong>orders:</strong> "order_count", "transactions", "sales"
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
