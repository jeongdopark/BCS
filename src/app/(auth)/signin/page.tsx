'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { GoChevronRight } from 'react-icons/go'
import Link from 'next/link'
import { signInWithKakao, signin } from '@/actions/auth'
import Toast from '@/components/common/Toast'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export default function Signin() {
  const set_user_info = useUserStore((state: any) => state.set_user_info)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await signin({
      email: values.email,
      password: values.password,
    })

    if (error) {
      Toast({
        title: '로그인 실패',
        description: error,
        mode: 'fail',
      })
      throw console.error(error)
    } else {
      localStorage.setItem('user_id', data.user!.id)
      set_user_info({ data })
      Toast({
        title: '로그인 완료',
        description: '로그인 완료',
        mode: 'success',
      })

      router.push(`/store-management`)
    }
  }
  return (
    <div className="w-[60%] p-2">
      <h2 className="text-3xl font-bold mb-6">로그인</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일을 입력해 주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            aria-hidden="true"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mb-4 w-full">
            로그인
          </Button>
        </form>
      </Form>
      <div className="flex gap-4 justify-start flex-col mt-4">
        <Link href="signup">
          <Button className="mb-4 w-full">
            회원가입
            <GoChevronRight />{' '}
          </Button>
        </Link>
      </div>
    </div>
  )
}
