import ProductCard from './ProductCard'
import { client } from '@/utils/supabase'
import { IProduct } from '@/types/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const RecommendList = async () => {
  let { data: products, error } = await client
    .from('products')
    .select('*')
    .eq('tag', 'recommend')

  return (
    <div className="w-[90%] flex flex-col gap-3">
      <strong>추천 메뉴</strong>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {products?.map((product: IProduct, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <ProductCard product={product} key={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default RecommendList
