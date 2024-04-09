import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
  takeoutHandler: (boolean: boolean) => void
  initStore: () => void
}

type OrderStore = OrderState & OrderActions

// export const useOrderStore = create<OrderStore>()((set) => ({
//   isTakeout: false,
//   total_amount: 0,
//   orders: [],
//   takeoutHandler: (boolean) => set(() => ({ isTakeout: boolean })),
//   removeAllOrders: () => set(() => ({ orders: [] })),
//   addOrder: (newOrder) =>
//     set((state) => ({ orders: [...state.orders, newOrder] })),
//   addAmount: (amount: number) =>
//     set((state) => ({ total_amount: state.total_amount + amount })),
//   removeOrder: (uid: number, price: number) =>
//     set((state) => ({
//       orders: state.orders.filter((order) => order.uid !== uid),
//       total_amount: state.total_amount - price,
//     })),
//   initStore: () =>
//     set(() => ({ isTakeout: false, orders: [], total_amount: 0 })),
// }))

export const useOrderStore = create(
  persist(
    (set) => ({
      isTakeout: false,
      total_amount: 0,
      orders: [],
      takeoutHandler: (boolean: boolean) => set(() => ({ isTakeout: boolean })),
      removeAllOrders: () => set(() => ({ orders: [] })),
      addOrder: (newOrder: any) =>
        set((state: any) => ({ orders: [...state.orders, newOrder] })),
      addAmount: (amount: number) =>
        set((state: any) => ({ total_amount: state.total_amount + amount })),
      removeOrder: (uid: number, price: number) =>
        set((state: any) => ({
          orders: state.orders.filter((order: any) => order.uid !== uid),
          total_amount: state.total_amount - price,
        })),
      initStore: () =>
        set(() => ({ isTakeout: false, orders: [], total_amount: 0 })),
    }),
    {
      name: 'order', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

// export const useUserStore = create(
//   persist(
//     (set, get) => ({
//       user_info: {},
//       set_user_info: (info: any) => set({ user_info: info }),
//     }),
//     {
//       name: 'user', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     },
//   ),
// )
