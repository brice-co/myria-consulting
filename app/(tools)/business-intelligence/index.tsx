"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettingsStore } from "@/app/(tools)/business-intelligence/lib/stores/settings-store"
import { useDataSourcesStore } from "@/app/(tools)/business-intelligence/lib/stores/data-sources-store"
import { DataConnector } from "@/app/(tools)/business-intelligence/lib/data-connectors"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  LineChart,
  Activity,
  Target,
  Download,
  Brain,
  AlertTriangle,
  CheckCircle,
  Database,
  RefreshCw,
  Upload,
  FileSpreadsheet,
  X,
  Info,
  Headphones,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
  Bar,
} from "recharts"

interface BusinessData {
  date: string
  revenue: number
  expenses: number
  profit: number
  customers: number
  orders: number
  conversion: number
  traffic: number
}

interface KPIData {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: any
  color: string
}

interface AIInsight {
  type: "opportunity" | "warning" | "success" | "info"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  recommendation: string
}

interface CSVColumnMapping {
  date?: string
  revenue?: string
  expenses?: string
  profit?: string
  customers?: string
  orders?: string
  conversion?: string
  traffic?: string
}

interface DataAvailability {
  date: boolean
  revenue: boolean
  expenses: boolean
  profit: boolean
  customers: boolean
  orders: boolean
  conversion: boolean
  traffic: boolean
}

export default function BusinessIntelligencePage() {
  const router = useRouter()
  const { apiKey, model } = useSettingsStore()
  const { dataSources, activeDataSource, setActiveDataSource, addDataSource } = useDataSourcesStore()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [customData, setCustomData] = useState("")
  const [analysisPrompt, setAnalysisPrompt] = useState("")
  const [businessData, setBusinessData] = useState<BusinessData[]>([])
  const [dataSource, setDataSource] = useState<string>("sample")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvData, setCsvData] = useState<any[]>([])
  const [columnMapping, setColumnMapping] = useState<CSVColumnMapping>({})
  const [isProcessingCsv, setIsProcessingCsv] = useState(false)
  const [dataAvailability, setDataAvailability] = useState<DataAvailability>({
    date: true,
    revenue: true,
    expenses: true,
    profit: true,
    customers: true,
    orders: true,
    conversion: true,
    traffic: true,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample business data (fallback)
  const sampleData: BusinessData[] = [
    {
      date: "2024-01-01",
      revenue: 45000,
      expenses: 32000,
      profit: 13000,
      customers: 1250,
      orders: 890,
      conversion: 3.2,
      traffic: 28000,
    },
    {
      date: "2024-01-02",
      revenue: 52000,
      expenses: 35000,
      profit: 17000,
      customers: 1340,
      orders: 950,
      conversion: 3.5,
      traffic: 27000,
    },
    {
      date: "2024-01-03",
      revenue: 48000,
      expenses: 33000,
      profit: 15000,
      customers: 1280,
      orders: 920,
      conversion: 3.4,
      traffic: 27500,
    },
    {
      date: "2024-01-04",
      revenue: 55000,
      expenses: 36000,
      profit: 19000,
      customers: 1420,
      orders: 1020,
      conversion: 3.7,
      traffic: 28500,
    },
    {
      date: "2024-01-05",
      revenue: 61000,
      expenses: 38000,
      profit: 23000,
      customers: 1580,
      orders: 1150,
      conversion: 4.0,
      traffic: 29000,
    },
    {
      date: "2024-01-06",
      revenue: 58000,
      expenses: 37000,
      profit: 21000,
      customers: 1490,
      orders: 1080,
      conversion: 3.8,
      traffic: 28800,
    },
    {
      date: "2024-01-07",
      revenue: 63000,
      expenses: 39000,
      profit: 24000,
      customers: 1620,
      orders: 1200,
      conversion: 4.1,
      traffic: 29500,
    },
    {
      date: "2024-01-08",
      revenue: 59000,
      expenses: 38000,
      profit: 21000,
      customers: 1520,
      orders: 1120,
      conversion: 3.9,
      traffic: 29200,
    },
    {
      date: "2024-01-09",
      revenue: 66000,
      expenses: 40000,
      profit: 26000,
      customers: 1680,
      orders: 1280,
      conversion: 4.3,
      traffic: 30000,
    },
    {
      date: "2024-01-10",
      revenue: 70000,
      expenses: 42000,
      profit: 28000,
      customers: 1750,
      orders: 1350,
      conversion: 4.5,
      traffic: 30500,
    },
  ]

  // Load data based on selected source
  useEffect(() => {
    const loadData = async () => {
      if (dataSource === "sample") {
        setBusinessData(sampleData)
        // Sample data has all fields
        setDataAvailability({
          date: true,
          revenue: true,
          expenses: true,
          profit: true,
          customers: true,
          orders: true,
          conversion: true,
          traffic: true,
        })
        return
      }

      if (dataSource === "csv-upload") {
        // Load data from uploaded CSV
        const storedData = localStorage.getItem("csv-uploaded-data")
        const storedAvailability = localStorage.getItem("csv-data-availability")
        if (storedData && storedAvailability) {
          try {
            const parsedData = JSON.parse(storedData)
            const parsedAvailability = JSON.parse(storedAvailability)
            if (Array.isArray(parsedData) && parsedData.length > 0) {
              setBusinessData(parsedData)
              setDataAvailability(parsedAvailability)
            } else {
              setBusinessData(sampleData)
              setDataAvailability({
                date: true,
                revenue: true,
                expenses: true,
                profit: true,
                customers: true,
                orders: true,
                conversion: true,
                traffic: true,
              })
            }
          } catch (error) {
            console.error("Error loading CSV data:", error)
            setBusinessData(sampleData)
          }
        } else {
          setBusinessData(sampleData)
        }
        return
      }

      // Load data from connected data source
      const storedData = localStorage.getItem(`business-data-${dataSource}`)
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData)
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setBusinessData(parsedData)
            // Detect available fields from API data
            detectDataAvailability(parsedData)
          } else {
            console.warn("Invalid stored data format, using sample data")
            setBusinessData(sampleData)
          }
        } catch (error) {
          console.error("Error parsing stored data:", error)
          setBusinessData(sampleData)
        }
      } else {
        // No stored data, try to fetch from data source
        const selectedDataSource = dataSources.find((ds) => ds.id === dataSource)
        if (selectedDataSource && selectedDataSource.status === "connected") {
          try {
            const data = await DataConnector.fetchData(selectedDataSource)
            setBusinessData(data)
            detectDataAvailability(data)
            localStorage.setItem(`business-data-${dataSource}`, JSON.stringify(data))
          } catch (error) {
            console.error("Error fetching data:", error)
            setBusinessData(sampleData)
          }
        } else {
          setBusinessData(sampleData)
        }
      }
    }

    loadData()
  }, [dataSource, dataSources])

  const detectDataAvailability = (data: BusinessData[]) => {
    if (data.length === 0) return

    const sample = data[0]
    const hasNonZeroValues = (key: keyof BusinessData) => {
      return data.some((item) => item[key] && item[key] !== 0)
    }

    setDataAvailability({
      date: !!sample.date,
      revenue: hasNonZeroValues("revenue"),
      expenses: hasNonZeroValues("expenses"),
      profit: hasNonZeroValues("profit"),
      customers: hasNonZeroValues("customers"),
      orders: hasNonZeroValues("orders"),
      conversion: hasNonZeroValues("conversion"),
      traffic: hasNonZeroValues("traffic"),
    })
  }

  const refreshData = async () => {
    if (dataSource === "sample" || dataSource === "csv-upload") return

    const selectedDataSource = dataSources.find((ds) => ds.id === dataSource)
    if (!selectedDataSource) return

    setIsRefreshing(true)
    try {
      const data = await DataConnector.fetchData(selectedDataSource)
      setBusinessData(data)
      detectDataAvailability(data)
      localStorage.setItem(`business-data-${dataSource}`, JSON.stringify(data))
    } catch (error) {
      console.error("Error refreshing data:", error)
      alert("Failed to refresh data. Using cached data.")
    } finally {
      setIsRefreshing(false)
    }
  }

  // CSV Upload Handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      setUploadedFile(file)
      parseCSV(file)
    } else {
      alert("Please upload a valid CSV file")
    }
  }

  const parseCSV = (file: File) => {
    setIsProcessingCsv(true)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length < 2) {
          alert("CSV file must have at least a header row and one data row")
          setIsProcessingCsv(false)
          return
        }

        // Parse headers
        const headers = lines[0].split(",").map((h) => h.trim().replace(/['"]/g, ""))
        setCsvHeaders(headers)

        // Parse data
        const data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim().replace(/['"]/g, ""))
          const row: any = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ""
          })
          return row
        })

        setCsvData(data)

        // Auto-detect column mappings
        const autoMapping: CSVColumnMapping = {}
        const lowerHeaders = headers.map((h) => h.toLowerCase())

        // Auto-map common column names
        if (lowerHeaders.some((h) => h.includes("date") || h.includes("time"))) {
          autoMapping.date = headers[lowerHeaders.findIndex((h) => h.includes("date") || h.includes("time"))]
        }
        if (lowerHeaders.some((h) => h.includes("revenue") || h.includes("sales"))) {
          autoMapping.revenue = headers[lowerHeaders.findIndex((h) => h.includes("revenue") || h.includes("sales"))]
        }
        if (lowerHeaders.some((h) => h.includes("expense") || h.includes("cost"))) {
          autoMapping.expenses = headers[lowerHeaders.findIndex((h) => h.includes("expense") || h.includes("cost"))]
        }
        if (lowerHeaders.some((h) => h.includes("profit"))) {
          autoMapping.profit = headers[lowerHeaders.findIndex((h) => h.includes("profit"))]
        }
        if (lowerHeaders.some((h) => h.includes("customer"))) {
          autoMapping.customers = headers[lowerHeaders.findIndex((h) => h.includes("customer"))]
        }
        if (lowerHeaders.some((h) => h.includes("order"))) {
          autoMapping.orders = headers[lowerHeaders.findIndex((h) => h.includes("order"))]
        }
        if (lowerHeaders.some((h) => h.includes("conversion"))) {
          autoMapping.conversion = headers[lowerHeaders.findIndex((h) => h.includes("conversion"))]
        }
        if (lowerHeaders.some((h) => h.includes("traffic") || h.includes("visit"))) {
          autoMapping.traffic = headers[lowerHeaders.findIndex((h) => h.includes("traffic") || h.includes("visit"))]
        }

        setColumnMapping(autoMapping)
        setIsProcessingCsv(false)
      } catch (error) {
        console.error("Error parsing CSV:", error)
        alert("Error parsing CSV file. Please check the file format.")
        setIsProcessingCsv(false)
      }
    }

    reader.readAsText(file)
  }

  const processCsvData = () => {
    try {
      const transformedData: BusinessData[] = csvData.map((row, index) => {
        const getNumericValue = (key?: string): number => {
          if (!key || key === "__none__" || !row[key]) return 0
          const value = row[key].toString().replace(/[,$]/g, "")
          return Number.parseFloat(value) || 0
        }

        const revenue = getNumericValue(columnMapping.revenue)
        const expenses = getNumericValue(columnMapping.expenses)
        const profit =
          columnMapping.profit && columnMapping.profit !== "__none__"
            ? getNumericValue(columnMapping.profit)
            : revenue - expenses

        return {
          date:
            columnMapping.date && columnMapping.date !== "__none__"
              ? row[columnMapping.date]
              : new Date().toISOString().split("T")[0],
          revenue,
          expenses,
          profit,
          customers: getNumericValue(columnMapping.customers),
          orders: getNumericValue(columnMapping.orders),
          conversion: getNumericValue(columnMapping.conversion),
          traffic: getNumericValue(columnMapping.traffic),
        }
      })

      // Detect which fields have actual data
      const availability: DataAvailability = {
        date: !!(columnMapping.date && columnMapping.date !== "__none__"),
        revenue: !!(columnMapping.revenue && columnMapping.revenue !== "__none__"),
        expenses: !!(columnMapping.expenses && columnMapping.expenses !== "__none__"),
        profit:
          !!(columnMapping.profit && columnMapping.profit !== "__none__") ||
          !!(columnMapping.revenue && columnMapping.expenses),
        customers: !!(columnMapping.customers && columnMapping.customers !== "__none__"),
        orders: !!(columnMapping.orders && columnMapping.orders !== "__none__"),
        conversion: !!(columnMapping.conversion && columnMapping.conversion !== "__none__"),
        traffic: !!(columnMapping.traffic && columnMapping.traffic !== "__none__"),
      }

      // Save to localStorage
      localStorage.setItem("csv-uploaded-data", JSON.stringify(transformedData))
      localStorage.setItem("csv-data-availability", JSON.stringify(availability))

      // Update state
      setBusinessData(transformedData)
      setDataAvailability(availability)
      setDataSource("csv-upload")
      setShowUploadModal(false)
      setUploadedFile(null)
    } catch (error) {
      console.error("Error processing CSV data:", error)
      alert("Error processing CSV data. Please check your column mappings.")
    }
  }

  const clearUploadedData = () => {
    localStorage.removeItem("csv-uploaded-data")
    localStorage.removeItem("csv-data-availability")
    setDataSource("sample")
    setBusinessData(sampleData)
    setUploadedFile(null)
    setCsvHeaders([])
    setCsvData([])
    setColumnMapping({})
    setDataAvailability({
      date: true,
      revenue: true,
      expenses: true,
      profit: true,
      customers: true,
      orders: true,
      conversion: true,
      traffic: true,
    })
  }

  // Calculate KPIs from actual data
  const calculateKPIs = (): KPIData[] => {
    if (businessData.length < 2) return []

    const latest = businessData[businessData.length - 1]
    const previous = businessData[businessData.length - 2]

    const kpis: KPIData[] = []

    // Revenue KPI
    if (dataAvailability.revenue) {
      const revenueChange = previous.revenue !== 0 ? ((latest.revenue - previous.revenue) / previous.revenue) * 100 : 0
      kpis.push({
        title: "Total Revenue",
        value: `$${latest.revenue.toLocaleString()}`,
        change: revenueChange,
        trend: revenueChange > 0 ? "up" : revenueChange < 0 ? "down" : "neutral",
        icon: DollarSign,
        color: "text-green-600",
      })
    }

    // Customers KPI
    if (dataAvailability.customers) {
      const customerChange =
        previous.customers !== 0 ? ((latest.customers - previous.customers) / previous.customers) * 100 : 0
      kpis.push({
        title: "Active Customers",
        value: latest.customers.toLocaleString(),
        change: customerChange,
        trend: customerChange > 0 ? "up" : customerChange < 0 ? "down" : "neutral",
        icon: Users,
        color: "text-blue-600",
      })
    }

    // Orders KPI
    if (dataAvailability.orders) {
      const orderChange = previous.orders !== 0 ? ((latest.orders - previous.orders) / previous.orders) * 100 : 0
      kpis.push({
        title: "Total Orders",
        value: latest.orders.toLocaleString(),
        change: orderChange,
        trend: orderChange > 0 ? "up" : orderChange < 0 ? "down" : "neutral",
        icon: ShoppingCart,
        color: "text-purple-600",
      })
    }

    // Conversion Rate KPI
    if (dataAvailability.conversion) {
      const conversionChange =
        previous.conversion !== 0 ? ((latest.conversion - previous.conversion) / previous.conversion) * 100 : 0
      kpis.push({
        title: "Conversion Rate",
        value: `${latest.conversion}%`,
        change: conversionChange,
        trend: conversionChange > 0 ? "up" : conversionChange < 0 ? "down" : "neutral",
        icon: Target,
        color: "text-orange-600",
      })
    }

    return kpis
  }

  const kpis = calculateKPIs()

  const generateAIInsights = async () => {
    if (!apiKey || isAnalyzing) return

    setIsAnalyzing(true)

    try {
      const sourceType =
        dataSource === "sample" ? "Sample Data" : dataSource === "csv-upload" ? "Uploaded CSV" : "Live Data"

      // Build data context based on available fields
      const availableFields = Object.entries(dataAvailability)
        .filter(([_, available]) => available)
        .map(([field]) => field)

      const dataContext = `
Business Performance Data (Source: ${sourceType}):
Dataset: ${businessData.length} records from ${businessData[0]?.date} to ${businessData[businessData.length - 1]?.date}
Available Fields: ${availableFields.join(", ")}

Current Performance:
${dataAvailability.revenue ? `- Latest Revenue: $${businessData[businessData.length - 1]?.revenue.toLocaleString()}` : ""}
${dataAvailability.revenue && kpis.find((k) => k.title === "Total Revenue") ? `- Revenue Trend: ${kpis.find((k) => k.title === "Total Revenue")!.change > 0 ? "Increasing" : "Decreasing"} by ${Math.abs(kpis.find((k) => k.title === "Total Revenue")!.change).toFixed(1)}%` : ""}
${dataAvailability.expenses ? `- Expenses: $${businessData[businessData.length - 1]?.expenses.toLocaleString()}` : ""}
${dataAvailability.profit ? `- Profit: $${businessData[businessData.length - 1]?.profit.toLocaleString()}` : ""}
${dataAvailability.customers ? `- Customers: ${businessData[businessData.length - 1]?.customers.toLocaleString()}` : ""}
${dataAvailability.orders ? `- Orders: ${businessData[businessData.length - 1]?.orders.toLocaleString()}` : ""}
${dataAvailability.conversion ? `- Conversion Rate: ${businessData[businessData.length - 1]?.conversion}%` : ""}
${dataAvailability.traffic ? `- Traffic: ${businessData[businessData.length - 1]?.traffic.toLocaleString()}` : ""}

${customData ? `Additional Context: ${customData}` : ""}
${analysisPrompt ? `Specific Analysis Request: ${analysisPrompt}` : ""}
      `

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "You are a senior business intelligence analyst. Analyze the provided business data and generate 4-6 actionable insights. For each insight, provide: type (opportunity/warning/success/info), title, description, impact level (high/medium/low), and specific recommendation. Format as JSON array.",
            },
            {
              role: "user",
              content: `Analyze this business data and provide insights:\n\n${dataContext}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || ""

      try {
        const insights = JSON.parse(content)
        setAiInsights(Array.isArray(insights) ? insights : [])
      } catch (parseError) {
        const textInsights: AIInsight[] = [
          {
            type: "info",
            title: "AI Analysis Complete",
            description: content.substring(0, 200) + "...",
            impact: "medium",
            recommendation: "Review the full analysis for detailed recommendations.",
          },
        ]
        setAiInsights(textInsights)
      }
    } catch (error) {
      console.error("Error generating insights:", error)
      setAiInsights([
        {
          type: "warning",
          title: "Analysis Error",
          description: "Unable to generate AI insights. Please check your API key and try again.",
          impact: "low",
          recommendation: "Verify your OpenAI API key in settings.",
        },
      ])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportData = () => {
    const csvContent = [
      "Date,Revenue,Expenses,Profit,Customers,Orders,Conversion,Traffic",
      ...businessData.map(
        (row) =>
          `${row.date},${row.revenue},${row.expenses},${row.profit},${row.customers},${row.orders},${row.conversion},${row.traffic}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `business-data-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background py-30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          
          <div className="flex items-center justify-between mt-10">
            <div>
              <h1 className="text-3xl font-bold text-primary">AI Business Intelligence</h1>
              <p className="text-gray-400">Comprehensive analytics and AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={dataSource} onValueChange={setDataSource}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Data Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sample">📊 Sample Data</SelectItem>
                  <SelectItem value="csv-upload">📁 Uploaded CSV</SelectItem>
                  {dataSources.map((ds) => (
                    <SelectItem key={ds.id} value={ds.id}>
                      {ds.status === "connected" ? "🟢" : ds.status === "error" ? "🔴" : "🟡"} {ds.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setShowUploadModal(true)} variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
              <Button
                onClick={() => router.push("/business-intelligence/data-sources")}
                variant="outline"
                size="sm"
              >
                <Database className="w-4 h-4 mr-2" />
                Data Sources
              </Button>
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                disabled={isRefreshing || dataSource === "sample" || dataSource === "csv-upload"}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={() => router.push("/business-intelligence/voice-agent")}
                variant="outline"
                size="sm"
              >
                <Headphones className="w-4 h-4 mr-2" />
                Voice Agent
              </Button>
              
            </div>
          </div>
        </div>

        {/* CSV Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileSpreadsheet className="w-5 h-5 mr-2" />
                    Upload CSV Data
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowUploadModal(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select CSV File</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="flex-1"
                    />
                    {uploadedFile && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUploadedFile(null)
                          setCsvHeaders([])
                          setCsvData([])
                          setColumnMapping({})
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ""
                          }
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Upload a CSV file with your business data. Required: Date and at least one metric (Revenue,
                    Customers, etc.)
                  </p>
                </div>

                {/* Preview and Column Mapping */}
                {csvHeaders.length > 0 && (
                  <>
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Column Mapping</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Map your CSV columns to the available fields. Auto-detected mappings are pre-filled. Only map
                        columns that exist in your data.
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: "date", label: "Date Column", required: true },
                          { key: "revenue", label: "Revenue Column", required: false },
                          { key: "expenses", label: "Expenses Column", required: false },
                          { key: "profit", label: "Profit Column", required: false },
                          { key: "customers", label: "Customers Column", required: false },
                          { key: "orders", label: "Orders Column", required: false },
                          { key: "conversion", label: "Conversion Rate Column", required: false },
                          { key: "traffic", label: "Traffic Column", required: false },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-sm font-medium mb-1">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <Select
                              value={columnMapping[field.key as keyof CSVColumnMapping] || "__none__"}
                              onValueChange={(value) =>
                                setColumnMapping({
                                  ...columnMapping,
                                  [field.key]: value === "__none__" ? undefined : value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select column" />
                              </SelectTrigger>
                              <SelectContent>
                                {!field.required && <SelectItem value="__none__">None (Skip)</SelectItem>}
                                {csvHeaders.map((header) => (
                                  <SelectItem key={header} value={header}>
                                    {header}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Preview */}
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Data Preview</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-400">
                            <thead className="bg-background">
                              <tr>
                                {csvHeaders.slice(0, 8).map((header) => (
                                  <th
                                    key={header}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray- uppercase"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {csvData.slice(0, 5).map((row, idx) => (
                                <tr key={idx}>
                                  {csvHeaders.slice(0, 8).map((header) => (
                                    <td key={header} className="px-4 py-2 text-sm text-gray-900">
                                      {row[header]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Showing first 5 rows of {csvData.length} total rows</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={processCsvData} disabled={!columnMapping.date || isProcessingCsv}>
                        {isProcessingCsv ? "Processing..." : "Import Data"}
                      </Button>
                    </div>
                  </>
                )}

                {/* Instructions when no file */}
                {!uploadedFile && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Business Data</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a CSV file with your business metrics to generate insights
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Source Status */}
        {dataSource === "csv-upload" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Using Uploaded CSV Data</span>
                  <span className="text-sm text-gray-500">({businessData.length} records)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                    <Upload className="w-3 h-3 mr-1" />
                    Upload New
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearUploadedData}>
                    <X className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
              {/* Show which fields are available */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs font-medium text-gray-600">Available fields:</span>
                {Object.entries(dataAvailability).map(
                  ([field, available]) =>
                    available && (
                      <span key={field} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        {field}
                      </span>
                    ),
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {dataSource !== "sample" && dataSource !== "csv-upload" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">
                    Connected to: {dataSources.find((ds) => ds.id === dataSource)?.name || "Unknown"}
                  </span>
                  <span className="text-sm text-gray-500">({businessData.length} records)</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isRefreshing && <span className="text-sm text-blue-600">Syncing data...</span>}
                  <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-background rounded-lg p-1 shadow-sm">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "revenue", label: "Revenue", icon: DollarSign, requiresRevenue: true },
            { id: "customers", label: "Customers", icon: Users, requiresCustomers: true },
            { id: "insights", label: "AI Insights", icon: Brain },
          ].map((tab) => {
            const Icon = tab.icon
            const isDisabled =
              (tab.requiresRevenue && !dataAvailability.revenue) ||
              (tab.requiresCustomers && !dataAvailability.customers)
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => !isDisabled && setActiveTab(tab.id)}
                className="flex-1"
                disabled={isDisabled}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            {kpis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, index) => {
                  const Icon = kpi.icon
                  const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Activity
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                            <p className="text-2xl font-bold text-primary">{kpi.value}</p>
                          </div>
                          <div className={`p-3 rounded-full bg-gray-100 ${kpi.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center">
                          <TrendIcon
                            className={`w-4 h-4 mr-1 ${
                              kpi.trend === "up"
                                ? "text-green-500"
                                : kpi.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              kpi.trend === "up"
                                ? "text-green-600"
                                : kpi.trend === "down"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {Math.abs(kpi.change).toFixed(1)}%
                          </span>
                          <span className="text-sm text-gray-400 ml-1">vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No KPIs Available</h3>
                  <p className="text-gray-600">
                    Upload a CSV file with revenue, customers, orders, or conversion data to see KPIs.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend - Only show if we have revenue data */}
              {dataAvailability.revenue && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="w-5 h-5 mr-2" />
                      {dataAvailability.profit ? "Revenue & Profit Trend" : "Revenue Trend"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {businessData && businessData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={businessData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                          {dataAvailability.profit && (
                            <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
                          )}
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">No data available</div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Customer & Traffic Trend - Only show if we have this data */}
              {(dataAvailability.customers || dataAvailability.traffic) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {dataAvailability.customers && dataAvailability.traffic
                        ? "Customers & Traffic"
                        : dataAvailability.customers
                          ? "Customer Trend"
                          : "Traffic Trend"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {businessData && businessData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={businessData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <Legend />
                          {dataAvailability.customers && (
                            <Line
                              type="monotone"
                              dataKey="customers"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              name="Customers"
                            />
                          )}
                          {dataAvailability.traffic && (
                            <Line type="monotone" dataKey="traffic" stroke="#f59e0b" strokeWidth={2} name="Traffic" />
                          )}
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-gray-500">No data available</div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Orders & Conversion - Show if available */}
            {(dataAvailability.orders || dataAvailability.conversion) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dataAvailability.orders && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Orders Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={businessData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <Bar dataKey="orders" fill="#8b5cf6" name="Orders" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}

                {dataAvailability.conversion && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={businessData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                            formatter={(value: number) => [`${value}%`, "Conversion"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="conversion"
                            stroke="#10b981"
                            strokeWidth={3}
                            name="Conversion Rate"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="space-y-6">
            {dataAvailability.revenue ? (
              <>
                {/* Revenue Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dataAvailability.expenses && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue vs Expenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <AreaChart data={businessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                            />
                            <YAxis />
                            <Tooltip
                              labelFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stackId="1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.6}
                              name="Revenue"
                            />
                            <Area
                              type="monotone"
                              dataKey="expenses"
                              stackId="2"
                              stroke="#ef4444"
                              fill="#ef4444"
                              fillOpacity={0.6}
                              name="Expenses"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}

                  {dataAvailability.profit && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Profit Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <RechartsBarChart data={businessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                            />
                            <YAxis />
                            <Tooltip
                              labelFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                              formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
                            />
                            <Bar dataKey="profit" fill="#10b981" name="Profit" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Revenue Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {dataAvailability.orders && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-primary">Average Order Value</h3>
                          <p className="text-3xl font-bold text-blue-600 mt-2">
                            $
                            {businessData.length > 0 && businessData[businessData.length - 1].orders > 0
                              ? (
                                  businessData[businessData.length - 1].revenue /
                                  businessData[businessData.length - 1].orders
                                ).toFixed(0)
                              : "0"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Per order</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary">Total Revenue</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          ${businessData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Period total</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary">Average Daily Revenue</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                          $
                          {businessData.length > 0
                            ? (businessData.reduce((sum, item) => sum + item.revenue, 0) / businessData.length).toFixed(
                                0,
                              )
                            : "0"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Per day</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-primary">Revenue Data Not Available</h3>
                  <p className="text-gray-600">Upload a CSV file with revenue data to see revenue analytics.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "customers" && (
          <div className="space-y-6">
            {dataAvailability.customers ? (
              <>
                {/* Customer Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {dataAvailability.traffic ? "Customer Growth & Traffic" : "Customer Growth"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={businessData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <YAxis yAxisId="left" />
                          {dataAvailability.traffic && <YAxis yAxisId="right" orientation="right" />}
                          <Tooltip
                            labelFormatter={(value) => {
                              try {
                                return new Date(value).toLocaleDateString()
                              } catch {
                                return value
                              }
                            }}
                          />
                          <Legend />
                          <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="customers"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                            name="Customers"
                          />
                          {dataAvailability.traffic && (
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="traffic"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              name="Website Traffic"
                            />
                          )}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {dataAvailability.conversion && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Conversion Rate Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <RechartsLineChart data={businessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                            />
                            <YAxis />
                            <Tooltip
                              labelFormatter={(value) => {
                                try {
                                  return new Date(value).toLocaleDateString()
                                } catch {
                                  return value
                                }
                              }}
                              formatter={(value: number) => [`${value}%`, "Conversion Rate"]}
                            />
                            <Line type="monotone" dataKey="conversion" stroke="#10b981" strokeWidth={3} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Customer Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary">Total Customers</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                          {businessData.length > 0
                            ? businessData[businessData.length - 1].customers.toLocaleString()
                            : "0"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Current count</p>
                      </div>
                    </CardContent>
                  </Card>

                  {dataAvailability.orders && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-primary">Orders per Customer</h3>
                          <p className="text-3xl font-bold text-green-600 mt-2">
                            {businessData.length > 0 && businessData[businessData.length - 1].customers > 0
                              ? (
                                  businessData[businessData.length - 1].orders /
                                  businessData[businessData.length - 1].customers
                                ).toFixed(2)
                              : "0"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Average</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary">Customer Growth</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                          {businessData.length > 1 && businessData[0].customers > 0
                            ? (
                                ((businessData[businessData.length - 1].customers - businessData[0].customers) /
                                  businessData[0].customers) *
                                100
                              ).toFixed(1)
                            : "0"}
                          %
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Period growth</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-primary">Customer Data Not Available</h3>
                  <p className="text-gray-600">Upload a CSV file with customer data to see customer analytics.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-6">
            {/* AI Analysis Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Business Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Business Context</label>
                  <Textarea
                    value={customData}
                    onChange={(e) => setCustomData(e.target.value)}
                    placeholder="Provide additional context about your business, recent changes, market conditions, etc."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Specific Analysis Request</label>
                  <Input
                    value={analysisPrompt}
                    onChange={(e) => setAnalysisPrompt(e.target.value)}
                    placeholder="What specific insights are you looking for? (e.g., 'Focus on customer retention strategies')"
                  />
                </div>
                <Button onClick={generateAIInsights} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Business Data...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate AI Insights
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            {aiInsights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiInsights.map((insight, index) => {
                  const getInsightIcon = () => {
                    switch (insight.type) {
                      case "opportunity":
                        return TrendingUp
                      case "warning":
                        return AlertTriangle
                      case "success":
                        return CheckCircle
                      default:
                        return Activity
                    }
                  }

                  const getInsightColor = () => {
                    switch (insight.type) {
                      case "opportunity":
                        return "border-blue-200 bg-blue-50"
                      case "warning":
                        return "border-yellow-200 bg-yellow-50"
                      case "success":
                        return "border-green-200 bg-green-50"
                      default:
                        return "border-gray-200 bg-gray-50"
                    }
                  }

                  const getIconColor = () => {
                    switch (insight.type) {
                      case "opportunity":
                        return "text-blue-600"
                      case "warning":
                        return "text-yellow-600"
                      case "success":
                        return "text-green-600"
                      default:
                        return "text-gray-600"
                    }
                  }

                  const Icon = getInsightIcon()

                  return (
                    <Card key={index} className={`border-2 ${getInsightColor()}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${getIconColor()}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  insight.impact === "high"
                                    ? "bg-red-100 text-red-800"
                                    : insight.impact === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {insight.impact} impact
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-3">{insight.description}</p>
                            <div className="bg-white p-3 rounded border">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">Recommendation:</h4>
                              <p className="text-gray-600 text-sm">{insight.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Sample Insights when no AI insights */}
            {aiInsights.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-primary">No Insights Generated Yet</h3>
                <p className="text-gray-600 mb-6">
                  Click the "Generate AI Insights" button above to analyze your business data and receive actionable
                  recommendations.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
