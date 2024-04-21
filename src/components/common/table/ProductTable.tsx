import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'

interface IProductContext {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPage: number
}

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPage = useRef(0)
}
