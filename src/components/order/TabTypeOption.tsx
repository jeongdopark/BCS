'use client'
import { OptionSelectType } from '@/types/product'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TabTypeOption = ({
  option,
  handleOptionChange,
}: {
  option: OptionSelectType
  handleOptionChange: ({
    option,
    name,
    price,
  }: {
    name: string
    option: string
    price: number
  }) => void
}) => {
  return (
    <Tabs
      defaultValue={option.options[0].name}
      className="w-[400px]"
      onValueChange={(e) => console.log(e)}
    >
      <TabsList>
        {option.options.map((elem) => (
          <TabsTrigger
            value={JSON.stringify({ name: elem.name, price: elem.price })}
            onClick={() => {
              console.log('click')

              handleOptionChange({
                name: option.name,
                option: elem.name,
                price: elem.price,
              })
            }}
          >
            {elem.name} +{elem.price}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default TabTypeOption
