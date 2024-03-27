import { Checkbox } from '@/components/ui/checkbox'
import { OptionSelectType, OptionBooleanType } from '@/types/product'

const CheckTypeOption = ({ option }: { option: OptionBooleanType }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        샷 추가
      </label>
    </div>
  )
}

export default CheckTypeOption
