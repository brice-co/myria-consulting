import type { DataSource } from "@/app/(tools)/business-intelligence/lib/stores/data-sources-store"

export interface BusinessData {
  date: string
  revenue: number
  expenses: number
  profit: number
  customers: number
  orders: number
  conversion: number
  traffic: number
}

export class DataConnector {
  static async testConnection(dataSource: DataSource): Promise<boolean> {
    try {
      switch (dataSource.type) {
        case "api":
          return await this.testAPIConnection(dataSource)
        case "database":
          return await this.testDatabaseConnection(dataSource)
        case "webhook":
          return true // Webhooks are passive, so we assume they work
        default:
          return false
      }
    } catch (error) {
      console.error("Connection test failed:", error)
      return false
    }
  }

  static async fetchData(dataSource: DataSource): Promise<BusinessData[]> {
    try {
      switch (dataSource.type) {
        case "api":
          return await this.fetchFromAPI(dataSource)
        case "database":
          return await this.fetchFromDatabase(dataSource)
        case "file":
          return await this.fetchFromFile(dataSource)
        default:
          throw new Error(`Unsupported data source type: ${dataSource.type}`)
      }
    } catch (error) {
      console.error("Data fetch failed:", error)
      throw error
    }
  }

  private static async testAPIConnection(dataSource: DataSource): Promise<boolean> {
    if (!dataSource.config.url) return false

    const response = await fetch(dataSource.config.url, {
      method: dataSource.config.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(dataSource.config.apiKey && { Authorization: `Bearer ${dataSource.config.apiKey}` }),
        ...dataSource.config.headers,
      },
    })

    return response.ok
  }

  private static async testDatabaseConnection(dataSource: DataSource): Promise<boolean> {
    // In a real implementation, this would test the actual database connection
    // For demo purposes, we'll simulate a connection test
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.2) // 80% success rate for demo
      }, 1000)
    })
  }

  private static async fetchFromAPI(dataSource: DataSource): Promise<BusinessData[]> {
    if (!dataSource.config.url) throw new Error("API URL not configured")

    const response = await fetch(dataSource.config.url, {
      method: dataSource.config.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(dataSource.config.apiKey && {
          Authorization: dataSource.config.apiKey.startsWith("Bearer ")
            ? dataSource.config.apiKey
            : `Bearer ${dataSource.config.apiKey}`,
        }),
        ...dataSource.config.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const rawData = await response.json()
    return this.transformData(rawData, dataSource.mapping)
  }

  private static async fetchFromDatabase(dataSource: DataSource): Promise<BusinessData[]> {
    // In a real implementation, this would connect to the actual database
    // For demo purposes, we'll simulate database data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockData(30)
        resolve(mockData)
      }, 2000)
    })
  }

  private static async fetchFromFile(dataSource: DataSource): Promise<BusinessData[]> {
    // This would handle file uploads and parsing
    // For now, return empty array
    return []
  }

  private static transformData(rawData: any, mapping: DataSource["mapping"]): BusinessData[] {
    let dataArray = rawData

    // Handle different response structures
    if (!Array.isArray(rawData)) {
      // Try common array property names
      const possibleArrayKeys = ["data", "results", "items", "records", "entries"]
      for (const key of possibleArrayKeys) {
        if (rawData[key] && Array.isArray(rawData[key])) {
          dataArray = rawData[key]
          break
        }
      }

      // If still not an array, try to find any array in the object
      if (!Array.isArray(dataArray)) {
        const possibleArrays = Object.values(rawData).filter(Array.isArray)
        if (possibleArrays.length > 0) {
          dataArray = possibleArrays[0]
        } else {
          throw new Error("No array data found in API response")
        }
      }
    }

    return dataArray.map((item: any, index: number) => {
      const transformedItem = {
        date:
          this.extractValue(item, mapping.date) ||
          new Date(Date.now() - (dataArray.length - index) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        revenue: Number(this.extractValue(item, mapping.revenue)) || Math.round(Math.random() * 50000 + 30000),
        expenses: 0,
        profit: 0,
        customers: Number(this.extractValue(item, mapping.customers)) || Math.round(Math.random() * 1000 + 500),
        orders: Number(this.extractValue(item, mapping.orders)) || Math.round(Math.random() * 800 + 200),
        conversion: Number(this.extractValue(item, mapping.conversion)) || Number((Math.random() * 5 + 2).toFixed(2)),
        traffic: Number(this.extractValue(item, mapping.traffic)) || Math.round(Math.random() * 25000 + 15000),
      }

      // Calculate derived fields
      transformedItem.expenses = transformedItem.expenses || Math.round(transformedItem.revenue * 0.7)
      transformedItem.profit = transformedItem.revenue - transformedItem.expenses

      return transformedItem
    })
  }

  private static extractValue(item: any, path?: string): any {
    if (!path || !item) return undefined

    try {
      return path.split(".").reduce((obj, key) => {
        if (obj === null || obj === undefined) return undefined

        // Handle array indices like "items[0]"
        const arrayMatch = key.match(/^(.+)\[(\d+)\]$/)
        if (arrayMatch) {
          const [, arrayKey, index] = arrayMatch
          return obj[arrayKey]?.[Number.parseInt(index)]
        }

        return obj[key]
      }, item)
    } catch (error) {
      console.warn(`Error extracting value for path "${path}":`, error)
      return undefined
    }
  }

  private static generateMockData(days: number): BusinessData[] {
    const data: BusinessData[] = []
    const baseDate = new Date()
    baseDate.setDate(baseDate.getDate() - days)

    for (let i = 0; i < days; i++) {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + i)

      // More realistic business data with trends
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const weekendMultiplier = isWeekend ? 0.7 : 1.0

      const baseRevenue = 45000 + i * 200 // Growth trend
      const revenue = Math.round((baseRevenue + Math.random() * 15000) * weekendMultiplier)
      const expenses = Math.round(revenue * (0.65 + Math.random() * 0.15))
      const profit = revenue - expenses

      const baseCustomers = 1200 + i * 8
      const customers = Math.round((baseCustomers + Math.random() * 300) * weekendMultiplier)
      const orders = Math.round(customers * (0.65 + Math.random() * 0.25))
      const traffic = Math.round(customers * (22 + Math.random() * 8))
      const conversion = Number(((orders / traffic) * 100).toFixed(2))

      data.push({
        date: date.toISOString().split("T")[0],
        revenue,
        expenses,
        profit,
        customers,
        orders,
        conversion,
        traffic,
      })
    }

    return data
  }
}

// Predefined API templates for common business platforms
export const API_TEMPLATES = {
  shopify: {
    name: "Shopify",
    type: "api" as const,
    config: {
      url: "https://{shop}.myshopify.com/admin/api/2023-10/orders.json",
      headers: {
        "X-Shopify-Access-Token": "{access_token}",
      },
    },
    mapping: {
      date: "created_at",
      revenue: "total_price",
      orders: "id",
      customers: "customer.id",
    },
  },
  stripe: {
    name: "Stripe",
    type: "api" as const,
    config: {
      url: "https://api.stripe.com/v1/charges",
      headers: {
        Authorization: "Bearer {secret_key}",
      },
    },
    mapping: {
      date: "created",
      revenue: "amount",
      customers: "customer",
    },
  },
  googleAnalytics: {
    name: "Google Analytics",
    type: "api" as const,
    config: {
      url: "https://analyticsreporting.googleapis.com/v4/reports:batchGet",
      headers: {
        Authorization: "Bearer {access_token}",
      },
    },
    mapping: {
      date: "dimensions[0]",
      traffic: "metrics[0].values[0]",
      conversion: "metrics[1].values[0]",
    },
  },
  salesforce: {
    name: "Salesforce",
    type: "api" as const,
    config: {
      url: "https://{instance}.salesforce.com/services/data/v58.0/query",
      headers: {
        Authorization: "Bearer {access_token}",
      },
    },
    mapping: {
      date: "CreatedDate",
      revenue: "Amount",
      customers: "AccountId",
    },
  },
  hubspot: {
    name: "HubSpot",
    type: "api" as const,
    config: {
      url: "https://api.hubapi.com/crm/v3/objects/deals",
      headers: {
        Authorization: "Bearer {access_token}",
      },
    },
    mapping: {
      date: "properties.createdate",
      revenue: "properties.amount",
      customers: "properties.hubspot_owner_id",
    },
  },
}
