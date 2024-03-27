import { OptionSelectType } from '@/types/product'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TabTypeOption = ({ option }: { option: OptionSelectType }) => {
  return (
    <Tabs defaultValue={option.options[0].name} className="w-[400px]">
      <TabsList>
        {option.options.map((elem) => (
          <TabsTrigger value={elem.name}>
            {elem.name} +{elem.price}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default TabTypeOption
