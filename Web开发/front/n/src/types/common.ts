export interface Response<T = any> {
  code: number
  message: string
  data?: T
}

export interface PaginationParams {
  page: number
  page_size: number
}

export interface PaginationResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}

export interface FilterParams { 
  start_time: string
  end_time: string

  level?: string
  type?: string 
  
  limit?: number
  offset?: number
  order?: 'asc' | 'desc'
  sort?: string
}