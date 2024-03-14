import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from './CustomTooltip'
const data = [
  {
    name: '일',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '월',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '화',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '수',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '목',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '금',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '토',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const WeekRevenue = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        barSize={40}
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 40, right: 40 }}
          className="text-sm"
        />
        <YAxis className="text-sm" />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#398bf7ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WeekRevenue
