import React from 'react'

interface IProps {
  children: React.ReactNode
  category: React.ReactNode
  modal: React.ReactNode
}

export default function Layout({ children, category, modal }: IProps) {
  return (
    <div className="flex">
      {category}
      {children}
      {modal}
    </div>
  )
}
