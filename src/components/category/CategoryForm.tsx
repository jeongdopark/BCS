'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import useCategoryUpdate from '@/hooks/mutation/useCategoryUpdate'
import useCreateCategory from '@/hooks/mutation/useCreateCategory'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Toast from '../common/Toast'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

const formSchema = z.object({
  category: z.string().min(2, {
    message: '카테고리 입력해 주세요.',
  }),
})

interface IProp {
  mode: 'create' | 'update'
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  name?: string
  id?: number
}

const CategoryForm = ({ mode, name, id, setIsModalOpen }: IProp) => {
  const createCategory = useCreateCategory()
  const updateCategory = useCategoryUpdate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: mode === 'create' ? '' : name,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    switch (mode) {
      case 'create':
        createCategory.mutate(values.category, {
          onSuccess: () => {
            console.log('Success')
            Toast({
              title: '추가 완료',
              description: values.category,
              mode: 'success',
            })
          },
          onError: (err) => {
            console.log('Fail')
            Toast({
              title: '등록 실패',
              description: err.message,
              mode: 'fail',
            })
          },
        })

      case 'update':
        updateCategory.mutate(
          { name: values.category, id: id! },
          {
            onSuccess: () => {
              console.log('Success')
              Toast({
                title: '추가 완료',
                description: values.category,
                mode: 'success',
              })
            },
            onError: (err) => {
              console.log('Fail')
              Toast({
                title: '등록 실패',
                description: err.message,
                mode: 'fail',
              })
            },
          },
        )
    }

    setIsModalOpen(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <FormControl>
                <Input placeholder="카테고리를 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            {mode === 'create' ? '추가' : '수정'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CategoryForm
