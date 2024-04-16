import { ICategory } from '@/types/category'
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

class ProductService {
  async createProduct({
    name,
    price,
    image_src,
    description,
    category,
    store,
    tag,
  }: IProduct) {
    await client
      .from('products')
      .insert([{ name, price, image_src, description, category, store, tag }])
  }

  async deleteProduct(product_id: string) {
    await client.from('products').delete().eq('id', product_id)
  }

  async getPaginatedProducts(
    start: number,
    end: number,
    store_id: string,
  ): Promise<{
    data:
      | {
          name: string
          id: number
          description: string
          image_src: string
          category: ICategory
          price: number
        }[]
      | null
    count: number | null
  }> {
    let { data, count } = await client
      .from('products')
      .select('*, category(name)', {
        count: 'exact',
      })
      .eq('store', store_id)
      .range(start, end)

    return { data, count }
  }

  async getProduct(id: string): Promise<IProduct[]> {
    const { data } = await client
      .from('products')
      .select('*, options')
      .eq('id', id)
    return data!
  }

  async getRecommendProduct(store_id: string) {
    let { data: products } = await client
      .from('products')
      .select('*')
      .eq('store', store_id)
      .eq('tag', 'recommend')
    return products
  }

  async getFilterByCategory({
    category,
    store_id,
  }: {
    category: string
    store_id: string
  }) {
    let { data: products } = await client
      .from('products')
      .select(`*, category!inner(*)`)
      .eq('store', store_id)
      .eq('category.english_name', category)
    return products
  }
}

export default new ProductService()
