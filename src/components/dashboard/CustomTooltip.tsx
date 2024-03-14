interface ITooltipPayload {
  name: string
  value: string | number
}

interface ICustomTooltip {
  active?: boolean
  payload?: ITooltipPayload[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: ICustomTooltip) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-black w-[100px] p-3 rounded-md">
        <p className="label text-white text-xs">{`${label}`}</p>
        <p className="label text-blue-600 text-sm">
          {payload ? payload[0].value.toLocaleString() + '원' : ''}
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
