import { client } from '@/utils/supabase'
interface IProduct {
  name: string
  category: string
  price: number
  description: string
  image_src: string
  store: string
  tag: 'recommend'
}

export const createProduct = async ({
  name,
  price,
  image_src,
  description,
  category,
  store,
  tag,
}: IProduct) => {
  const { data, error } = await client
    .from('products')
    .insert([{ name, price, image_src, description, category, store, tag }])
    .select()

  console.log(name, price, image_src, description, category, store, tag)

  console.log(data, error)
}
