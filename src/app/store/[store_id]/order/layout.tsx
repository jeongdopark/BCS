import React from 'react'

interface IProps {
  children: React.ReactNode
  category: React.ReactNode
  modal: React.ReactNode
  product: React.ReactNode
  recommend: React.ReactNode
}

export default function Layout({ children, category, modal, recommend, product }: IProps) {
  return (
    <div className="flex max-w-screen">
      <div className="w-[15%]">{category}</div>
      <div className="w-[85%] flex justify-center ">
        <div className="flex flex-col gap-8 items-center w-[70%] p-3  overflow-scroll mt-5 h-lvh">
          <div className="w-full flex justify-center">{recommend}</div>
          <div className="w-full flex justify-center">{product}</div>
        </div>
        <div className="w-[30%]">{children}</div>
      </div>
      {modal}
    </div>
  )
}
