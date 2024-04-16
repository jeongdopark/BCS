'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCategories } from '@/hooks/category/useCategoryService'
import { Dispatch, SetStateAction, useState } from 'react'
import { client } from '@/utils/supabase'
import { useCreateProduct } from '@/hooks/product/useProductService'
import Toast from '../common/Toast'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(30),
  category: z.string().min(2),
  price: z
    .string()
    // 사용자 입력이 숫자로만 구성되었는지 검사
    .regex(/^\d+\.?\d*$/, '숫자로 입력해 주세요.')
    // 검증 후 숫자로 변환
    .transform((val) => parseFloat(val)),
  image: z.any(),
})

const ProductForm = ({
  store_id,
  setIsModalOpen,
}: {
  store_id: string
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { data: categories } = useCategories(store_id)
  const createProduct = useCreateProduct()
  const [preview, setPreview] = useState<string>()
  const [image, setImage] = useState<File>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const getImageData = (file: File) => {
    const displayUrl = URL.createObjectURL(file)
    return displayUrl
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const createProductHandler = async () => {
      const { data, error } = await client.storage
        .from('BCS')
        .upload(`${store_id}/${image?.name}`, image!)

      if (data) {
        createProduct.mutate(
          {
            name: values.name,
            price: values.price,
            image_src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`,
            description: values.description,
            category: values.category,
            store: store_id,
            tag: 'recommend',
          },
          {
            onSuccess: () => {
              console.log('success')
              Toast({
                title: '상품 등록',
                description: '상품 등록 완료',
                mode: 'success',
              })
              setIsModalOpen(false)
            },
          },
        )
      }
    }
    createProductHandler()
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품명</FormLabel>
                <FormControl>
                  <Input placeholder="상품명을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택해 주세요." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories!.map((category) => {
                      return (
                        <SelectItem value={category.id}>
                          {category.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격</FormLabel>
                <FormControl>
                  <Input placeholder="가격을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Input placeholder="상품 설명을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>이미지</FormLabel>
                <FormControl>
                  <div className="flex justify-between ">
                    <Input
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const displayUrl = getImageData(event.target.files![0])
                        setPreview(displayUrl)
                        setImage(event.target.files![0])
                        onChange(event.target.files![0])
                      }}
                      className="w-[50%]"
                    />
                    <picture className="w-[150px] h-[150px] relative ">
                      {preview && (
                        <Image src={preview} alt="product image" fill />
                      )}
                    </picture>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              생성
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ProductForm
