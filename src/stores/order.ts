import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
