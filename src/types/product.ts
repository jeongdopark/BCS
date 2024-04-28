import { ICategory } from './category'

export interface OptionSelectType {
  name: string
  type: 'select'
  options: {
    name: string
    price: number
  }[]
}

export interface OptionBooleanType {
  name: string
  type: 'boolean'
  options: {
    name: string
    price: number
  }[]
}

export interface IProduct {
  id?: string
  name: string
  category: ICategory
  price: number
  description: string
  image_src: string
  tag: 'recommend'
  options?: (OptionBooleanType | OptionSelectType)[]
  store: string
  is_display: boolean
  is_sold_out: boolean
}

export interface IPaginationProduct {
  count: number
  data: IProduct[]
}

export type IProductCreate = Omit<IProduct, 'category'> & {
  category: any
}
