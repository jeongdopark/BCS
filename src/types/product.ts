import { ICategory } from './category'

export interface IProduct {
  id: string
  name: string
  category: ICategory
  price: number
  description: string
  image_src: string
  tag: 'recommend' | null
}
