'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import useCreateCategory from '@/hooks/mutation/useCreateCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { z } from 'zod'
import Toast from '../common/Toast'
import useCreateStore from '@/hooks/mutation/useCreateStore'
import useStore from '@/stores/useStore'
import { useUserStore } from '@/stores/user'

const formSchema = z.object({
  store: z.string().min(2, {
    message: '카테고리 입력해 주세요.',
  }),
})

interface IProp {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  name?: string
  id?: number
}

const StoreForm = ({ setIsModalOpen }: IProp) => {
  const createStore = useCreateStore()
  const user = useStore(useUserStore, (state: any) => state.user_info)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createStore.mutate(
      { name: values.store, user_id: user.data.user.id },
      {
        onSuccess: () => {
          console.log('Success')
          Toast({
            title: '추가 완료',
            description: values.store,
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

    setIsModalOpen(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>매장 등록</FormLabel>
              <FormControl>
                <Input placeholder="매장명을 입력해 주세요." {...field} />
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
  )
}

export default StoreForm
