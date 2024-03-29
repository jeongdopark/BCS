'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form'
import { Switch } from '@/components/ui/switch'
import {
  IOrderDisplay,
  IResponseOrderDisplay,
  OrderStatus,
} from '@/types/display-order'
import { ORDER_STATUS } from '@/constants/constant'
import Modal from '../common/Modal'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '../ui/select'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Toast from '../common/Toast'

interface IProps {
  orders: IOrderDisplay[]
  orderInitialInfo: Pick<
    IResponseOrderDisplay,
    'initialization_time' | 'auto_initialization'
  >
  setOrderInitialInfo: React.Dispatch<
    React.SetStateAction<
      | Pick<
          IResponseOrderDisplay,
          'initialization_time' | 'auto_initialization'
        >
      | undefined
    >
  >
  param: OrderStatus
}

const Header = ({
  orders,
  param,
  orderInitialInfo,
  setOrderInitialInfo,
}: IProps) => {
  const receive_count = orders.filter(
    (e) => e.order_status[0] === ORDER_STATUS.RECEIVE,
  ).length
  const complete_count = orders.filter(
    (e) => e.order_status[0] === ORDER_STATUS.COMPLETE,
  ).length
  const cancel_count = orders.filter(
    (e) => e.order_status[0] === ORDER_STATUS.CANCEL,
  ).length
  const router = useRouter()
  const TAB_TRIGGER_ELEMS = [
    {
      value: 'receive',
      router: ORDER_STATUS.RECEIVE,
      title: '접수',
      count: receive_count,
    },
    {
      value: 'complete',
      router: ORDER_STATUS.COMPLETE,
      title: '완료',
      count: complete_count,
    },
    {
      value: 'cancel',
      router: ORDER_STATUS.CANCEL,
      title: '취소',
      count: cancel_count,
    },
  ]

  const FormSchema = z.object({
    auto_switch: z.boolean(),
    auto_time: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    Toast({
      title: 'hello',
      mode: 'success',
      description: JSON.stringify(data, null, 2),
    })
  }

  const autoSwitchValue = form.watch('auto_switch')
  return (
    <div className="w-full h-[100px] flex justify-between items-center bg-gray-200 p-7">
      <Button className=" bg-gray-200 hover:bg-gray-200">
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs defaultValue={param} className="w-[50%] flex justify-center">
        <TabsList className="w-full">
          {TAB_TRIGGER_ELEMS.map((tab) => {
            return (
              <TabsTrigger
                key={tab.title}
                value={tab.value}
                className="w-full"
                onClick={() => router.push(`?status=${tab.router}&page=1`)}
              >
                {tab.title} {tab.count}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
      <Modal
        InnerComponent={
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="auto_switch"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>자동 초기화 설정</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            defaultChecked={
                              orderInitialInfo.auto_initialization
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {autoSwitchValue ? (
                    <FormField
                      control={form.control}
                      name="auto_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>자동 초기화 시간</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="시간을 설정해 주세요." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array(24)
                                .fill(0)
                                .map((_, i) => (
                                  <SelectItem
                                    value={i < 10 ? `0${i}:00` : `${i}:00`}
                                  >
                                    {i < 10 ? `0${i}:00` : `${i}:00`}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="auto_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>자동 초기화 OFF</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="시간을 설정해 주세요." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={'false'}>
                                자동 초기화 OFF
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button type="submit" className="w-[120px]">
                  설정
                </Button>
              </div>
            </form>
          </Form>
        }
        title="초기화 설정"
        trigger={<Button>설정</Button>}
      />
    </div>
  )
}

export default Header
