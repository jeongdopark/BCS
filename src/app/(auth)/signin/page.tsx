'use client'
import { BackgroundGradient } from '@/components/ui/background-gradient'
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
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-zinc-900 p-12 text-white flex flex-col justify-between items-center">
        <div className="flex rounded-[22px] justify-center items-center h-full">
          <BackgroundGradient className="rounded-[22px] w-[250px] h-[250px] max-w-sm p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900">
            <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
              <div className="text-7xl font-bold">BCS</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Buyer Connect Seller
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center items-center">
        <div className="w-[60%] p-2">
          <h2 className="text-3xl font-bold mb-6">로그인</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
            <Button className="mb-4 w-full">회원가입</Button>
          </div>
          <div className="relative mb-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">간편 로그인</span>
            </div>
          </div>
          <div className="flex gap-4  justify-start">
            <Button className="flex flex-1 justify-center">Kakao</Button>
            <Button className="flex flex-1 justify-center">Google</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
