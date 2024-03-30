import { create } from 'zustand'

export interface IOrder {
  count: number
  price: number
  img_url: string
  product_name: string
  product_id: string
  options?: {
    name: string
    price: number
    option: string
  }[]
  uid: number
}

interface OrderState {
  orders: IOrder[]
  total_amount: number
  isTakeout: boolean
}

interface OrderActions {
  addOrder: (order: OrderState['orders'][number]) => void
  removeAllOrders: () => void
  addAmount: (amount: number) => void
  removeOrder: (uid: number, price: number) => void
  takeoutHandler: (boolean:boolean) => void
}

type OrderStore = OrderState & OrderActions

export const useOrderStore = create<OrderStore>()((set) => ({
  isTakeout: false,
  total_amount: 0,
  orders: [],
  takeoutHandler: (boolean) => set((state) => ({ isTakeout: boolean })),
  removeAllOrders: () => set(() => ({ orders: [] })),
  addOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })),
  addAmount: (amount: number) =>
    set((state) => ({ total_amount: state.total_amount + amount })),
  removeOrder: (uid: number, price: number) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.uid !== uid),
      total_amount: state.total_amount - price,
    })),
}))