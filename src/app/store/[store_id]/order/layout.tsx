import React from 'react'

interface IProps {
  children: React.ReactNode
  category: React.ReactNode
  modal: React.ReactNode
}

export default function Layout({ children, category, modal }: IProps) {
  return (
    <div className="flex max-w-screen">
      <div className="w-[15%]">{category}</div>
      <div className="w-[85%]">{children}</div>
      {modal}
    </div>
  )
}
