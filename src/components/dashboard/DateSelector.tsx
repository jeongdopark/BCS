import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'

const DateSeletor = ({ year, month }: { year: number; month: number }) => {
  return (
    <div className="flex w-full gap-3">
      <Select defaultValue={`${year}년`}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            <SelectItem value="2024년">2024년</SelectItem>
            <SelectItem value="2023년">2023년</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select defaultValue={`${month}월`}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {Array(12)
              .fill(0)
              .map((_, idx) => (
                <SelectItem value={`${idx + 1}월`}>{idx + 1}월</SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button>선택</Button>
    </div>
  )
}

export default DateSeletor
