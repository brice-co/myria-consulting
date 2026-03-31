import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface DataSource {
  id: string
  name: string
  type: "api" | "database" | "file" | "webhook"
  status: "connected" | "disconnected" | "error" | "syncing"
  config: {
    url?: string
    apiKey?: string
    headers?: Record<string, string>
    method?: "GET" | "POST" | "PUT" | "DELETE"
    database?: {
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  type?: "mysql" | "postgresql" | "mongodb";
}

    refreshInterval?: number
    lastSync?: string
  }
  mapping: {
    date?: string
    revenue?: string
    expenses?: string
    profit?: string
    customers?: string
    orders?: string
    conversion?: string
    traffic?: string
    [key: string]: string | undefined
  }
  createdAt: Date
  updatedAt: Date
}

interface DataSourcesState {
  dataSources: DataSource[]
  activeDataSource: string | null
  isLoading: boolean
  error: string | null
  addDataSource: (dataSource: Omit<DataSource, "id" | "createdAt" | "updatedAt">) => void
  updateDataSource: (id: string, updates: Partial<DataSource>) => void
  removeDataSource: (id: string) => void
  setActiveDataSource: (id: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useDataSourcesStore = create<DataSourcesState>()(
  persist(
    (set, get) => ({
      dataSources: [],
      activeDataSource: null,
      isLoading: false,
      error: null,
      addDataSource: (dataSource) => {
        const newDataSource: DataSource = {
          ...dataSource,
          id: `ds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          config: {
            method: "GET",
            headers: {},
            ...dataSource.config,
          },
          mapping: {
            date: "",
            revenue: "",
            expenses: "",
            profit: "",
            customers: "",
            orders: "",
            conversion: "",
            traffic: "",
            ...dataSource.mapping,
          },
        }
        set((state) => ({
          dataSources: [...state.dataSources, newDataSource],
        }))
      },
      updateDataSource: (id, updates) => {
        set((state) => ({
          dataSources: state.dataSources.map((ds) =>
            ds.id === id ? { ...ds, ...updates, updatedAt: new Date() } : ds,
          ),
        }))
      },
      removeDataSource: (id) => {
        set((state) => ({
          dataSources: state.dataSources.filter((ds) => ds.id !== id),
          activeDataSource: state.activeDataSource === id ? null : state.activeDataSource,
        }))
      },
      setActiveDataSource: (id) => set({ activeDataSource: id }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "ai-toolkit-data-sources",
    },
  ),
)
