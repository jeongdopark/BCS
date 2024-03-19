import React from 'react'

interface IProps {
  children: React.ReactNode
  category: React.ReactNode
}

export default function Layout({ children, category }: IProps) {
  return (
    <div className="flex">
      {category}
      {children}
    </div>
  )
}
