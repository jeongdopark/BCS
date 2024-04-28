import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'
import { IProduct, IProductCreate } from '@/types/product'

class ProductService {
  async createProduct({ name, price, image_src, description, category, store, tag, is_display, is_sold_out }: IProductCreate) {
    await client.from('products').insert([{ name, price, image_src, description, category, store, tag, is_display, is_sold_out }])
  }

  async allProducts(store_id: string) {
    const { data } = await client.from('products').select('*').eq('store', store_id).order('created_at')
    return data
  }

  async deleteProduct(product_id: string) {
    await client.from('products').delete().eq('id', product_id)
  }

  async updateProductDisplay({ product_id, current_status }: { product_id: string; current_status: boolean }) {
    await client
      .from('products')
      .update({ is_display: current_status ? false : true })
      .eq('id', product_id)
      .select()
  }

  async updateProductSoldOut({ product_id, current_status }: { product_id: string; current_status: boolean }) {
    await client
      .from('products')
      .update({ is_sold_out: current_status ? false : true })
      .eq('id', product_id)
      .select()
  }

  async getPaginatedProducts(
    start: number,
    end: number,
    store_id: string,
  ): Promise<{
    data:
      | {
          name: string
          id: string
          description: string
          image_src: string
          category: ICategory
          price: number
          is_display: boolean
          is_sold_out: boolean
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
      .order('created_at')
      .range(start, end)

    return { data, count }
  }

  async getProduct(id: string): Promise<IProduct> {
    const { data } = await client.from('products').select('*, options').eq('id', id)
    return data![0]
  }

  async getRecommendProduct(store_id: string) {
    let { data: products } = await client.from('products').select('*').eq('store', store_id).eq('tag', 'recommend').order('created_at')
    return products
  }

  async getFilterByCategory({ category, store_id }: { category: string; store_id: string }) {
    let { data: products } = await client
      .from('products')
      .select(`id, name, price,image_src, description, tag, options , store,category!inner(*)`)
      .eq('store', store_id)
      .eq('category.english_name', category)
    return products
  }
}

export default new ProductService()
