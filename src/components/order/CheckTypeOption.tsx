import { Checkbox } from '@/components/ui/checkbox'
import { OptionBooleanType } from '@/types/product'

const CheckTypeOption = ({
  option,
  handleOptionChange,
}: {
  option: OptionBooleanType
  handleOptionChange: ({
    option,
    price,
    name,
  }: {
    option: string
    price: number
    name: string
  }) => void
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        onClick={() =>
          handleOptionChange({
            option: option.options[0].name,
            name: option.name,
            price: option.options[0].price,
          })
        }
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {option.name} +{option.options[0].price}
      </label>
    </div>
  )
}

export default CheckTypeOption
