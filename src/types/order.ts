export interface IOrder {
  count: number
  price: number
  img_url?: string
  product_name: string
  product_id: string
  options?: {
    name: string
    price: number
    option: string
  }[]
  uid: number
}

export type OrderStatus = 'receive' | 'complete' | 'cancel'

export interface IDisplayOrder {
  created_at: Date
  status: OrderStatus
  id: number
  takeout: boolean
  orders: IOrder[]
}

export interface IOrderDisplay {
  collectionId: string
  collectionName: 'orders'
  created: Date
  updated: Date
  id: string
  order_number: number
  order_time: string
  order_elapsed: Date
  order_menus: { menu: string; amount: number }[]
  order_status: OrderStatus
  complete_time: string
}

export interface IResponseOrderDisplay {
  collectionId: string
  collectionName: string
  expand: {
    orders: IOrderDisplay[]
  }
  initialization_time: Date
  auto_initialization: boolean
}

export interface IHistoryOrder {
  id: number
  price: number
  takeout: boolean
  store_id: string
  created_at: Date
  status: 'receive' | 'complete' | 'cancel'
  orders: IOrder[]
}
