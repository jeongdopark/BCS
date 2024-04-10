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
  id: string
  name: string
  category: ICategory
  price: number
  description: string
  image_src: string
  tag: 'recommend' | null
  options?: (OptionBooleanType | OptionSelectType)[]
  store: string
}
