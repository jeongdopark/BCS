'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { z } from 'zod'
import Toast from '../common/Toast'
import { useCreateStore } from '@/hooks/store/useStoreService'
import useStore from '@/stores/useStore'
import { useUserStore } from '@/stores/user'

const formSchema = z.object({
  store: z.string().min(2, {
    message: '카테고리 입력해 주세요.',
  }),
  client_key: z.string().min(2, {
    message: '결제 클라이언트 키를 입력해 주세요.'
  })
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
      client_key : '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createStore.mutate(
      { name: values.store, user_id: user.data.user.id, toss_client_key: values.client_key },
      {
        onSuccess: () => {
          Toast({
            title: '추가 완료',
            description: values.store,
            mode: 'success',
          })
        },
        onError: (err) => {
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
              <FormLabel>매장명</FormLabel>
              <FormControl>
                <Input placeholder="매장명을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>결제 클라이언트 키</FormLabel>
              <FormControl>
                <Input placeholder="결제 클라이언트 키를 입력해 주세요." {...field} />
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
