'use client'
import { Dispatch, SetStateAction } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/stores/order'
import Header from './Header'
// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = 'test_ck_BX7zk2yd8yn7aR5oJMvq3x9POLqK'
const customerKey = 'HWtu1OlOWKvNlyZD2T5sX'
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

const Payment = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<'takeout' | 'basket' | 'payment'>>
}) => {
  const [paymentWidget, setPaymentWidget] = useState(null)
  const paymentMethodsWidgetRef = useRef(null)
  const price = useOrderStore((state) => state.total_amount)

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          widgetClientKey,
          customerKey,
        )
        setPaymentWidget(loadedWidget)
      } catch (error) {
        console.error('Error fetching payment widget:', error)
      }
    }

    fetchPaymentWidget()
  }, [])

  useEffect(() => {
    if (paymentWidget == null) {
      return
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' },
    )

    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' })

    paymentMethodsWidgetRef.current = paymentMethodsWidget
  }, [paymentWidget, price])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null) {
      return
    }

    paymentMethodsWidget.updateAmount(price)
  }, [price])

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: `${window.location.origin}/store/cd6ca774-badc-491e-bedc-54e266da6d08/payment-success`,
        failUrl: `${window.location.origin}/fail`,
      })
    } catch (error) {
      console.error('Error requesting payment:', error)
    }
  }

  return (
    <div className="flex flex-col gap-1 items-center justify-between w-full">
      <Header step="basket" />
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* 결제하기 버튼 */}
      <div className="flex justify-center gap-3 w-full ">
        <Button
          size="lg"
          className="w-[100px]"
          onClick={() => setStep('basket')}
        >
          뒤로가기
        </Button>
        <Button size="lg" className="w-[100px]" onClick={handlePaymentRequest}>
          결제하기
        </Button>
      </div>
    </div>
  )
}

export default Payment
