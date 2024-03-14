import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from './CustomTooltip'

const data = [
  {
    name: '8/1',
    uv: 4000,
    pv: 5000,
    amt: 2400,
  },
  {
    name: '8/2',
    uv: 3000,
    pv: 7398,
    amt: 2210,
  },
  {
    name: '8/3',
    uv: 2000,
    pv: 7800,
    amt: 2290,
  },
  {
    name: '8/4',
    uv: 2780,
    pv: 7908,
    amt: 2000,
  },
  {
    name: '8/5',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: '8/6',
    uv: 2390,
    pv: 6800,
    amt: 2500,
  },
  {
    name: '8/7',
    uv: 3490,
    pv: 8300,
    amt: 2100,
  },
  {
    name: '8/8',
    uv: 4000,
    pv: 6400,
    amt: 2400,
  },
  {
    name: '8/9',
    uv: 3000,
    pv: 8398,
    amt: 2210,
  },
  {
    name: '8/10',
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: '8/11',
    uv: 2780,
    pv: 6908,
    amt: 2000,
  },
  {
    name: '8/12',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: '8/13',
    uv: 2390,
    pv: 8800,
    amt: 2500,
  },
  {
    name: '8/14',
    uv: 3490,
    pv: 6300,
    amt: 2100,
  },
  {
    name: '8/15',
    uv: 4000,
    pv: 8400,
    amt: 2400,
  },
  {
    name: '8/16',
    uv: 3000,
    pv: 8398,
    amt: 2210,
  },
  {
    name: '8/17',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '8/18',
    uv: 2780,
    pv: 7908,
    amt: 2000,
  },
  {
    name: '8/19',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: '8/20',
    uv: 2390,
    pv: 8800,
    amt: 2500,
  },
  {
    name: '8/21',
    uv: 3490,
    pv: 5300,
    amt: 2100,
  },
  {
    name: '8/22',
    uv: 4000,
    pv: 7400,
    amt: 2400,
  },
  {
    name: '8/23',
    uv: 3000,
    pv: 8398,
    amt: 2210,
  },
  {
    name: '8/24',
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: '8/25',
    uv: 2780,
    pv: 7008,
    amt: 2000,
  },
  {
    name: '8/26',
    uv: 1890,
    pv: 5800,
    amt: 2181,
  },
  {
    name: '8/27',
    uv: 2390,
    pv: 5800,
    amt: 2500,
  },
  {
    name: '8/28',
    uv: 3490,
    pv: 8300,
    amt: 2100,
  },
  {
    name: '8/26',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: '8/27',
    uv: 2390,
    pv: 7800,
    amt: 2500,
  },
  {
    name: '8/28',
    uv: 3490,
    pv: 8300,
    amt: 2100,
  },
]
const MonthRevenue = () => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        syncId="month"
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="linear" dataKey="pv" stroke="#75b5faff" fill="#dcecfcff" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default MonthRevenue
