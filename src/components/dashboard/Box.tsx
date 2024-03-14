const Box = ({ title, data }: { title: string; data: number | string }) => {
  let _data = data
  if (typeof data === 'number') _data = data.toLocaleString() + '원'
  return (
    <div className="bg-white rounded-md p-4">
      <p>{title}</p>
      <strong>{_data}</strong>
    </div>
  )
}

export default Box
