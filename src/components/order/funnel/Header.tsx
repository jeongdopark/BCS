import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  BsChevronRight,
  Bs2Circle,
  Bs3Circle,
  Bs4Circle,
} from 'react-icons/bs'

const Header = ({
  step,
}: {
  step: 'first' | 'takeout' | 'basket' | 'payment'
}) => {
  console.log(step)

  return (
    <div className="flex gap-3">
      <Bs1CircleFill />
      <BsChevronRight />
      {step === 'first' ? <Bs2Circle /> : <Bs2CircleFill />}
      <BsChevronRight />
      {step === 'takeout' || step === 'first' ? (
        <Bs3Circle />
      ) : (
        <Bs3CircleFill />
      )}
      <BsChevronRight />

      {step === 'payment' ? <Bs4CircleFill /> : <Bs4Circle />}
    </div>
  )
}

export default Header
