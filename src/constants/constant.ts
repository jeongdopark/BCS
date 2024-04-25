export const PAGINATION = {
  CATEGORY: 5,
  PRODUCT: 4,
}

export const ORDER_DISPLAY_PAGINATION_SIZE = 4

export const ORDER_STATUS = {
  RECEIVE: 'receive',
  COMPLETE: 'complete',
  CANCEL: 'cancel',
}

export const QUERY_KEY = {
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  STORE: 'STORE',
}

export type Payment = {
  UID: string
  price: number
  time: string
  payment: 'toss' | 'kakao'
}
