import { Button } from '../ui/button'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { format, addMonths, subMonths } from 'date-fns'

const Header = ({
  setCurrentDate,
  currentDate,
}: {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  currentDate: Date
}) => {
  const dateHandler = (func: Function) => {
    return () => {
      setCurrentDate(func(currentDate, 1))
    }
  }
  return (
    <div className="flex w-full">
      <div className="flex flex-row ">
        <div className="text-[25px] font-medium">
          {format(currentDate, 'yyyy년')}
        </div>
        <div>
          <div className="text-[25px] font-medium">
            {format(currentDate, 'M월')}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            className="bg-gray-200"
            onClick={dateHandler(subMonths)}
            size="sm"
          >
            <SlArrowLeft className="text-gray-500" size="10" />
          </Button>
          <Button
            className="bg-gray-200"
            onClick={dateHandler(addMonths)}
            size="sm"
          >
            <SlArrowRight className="text-gray-500" size="10" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
