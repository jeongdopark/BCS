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
      {step === 'basket' || step === 'takeout' || step === 'first' ? (
        <Bs4Circle />
      ) : (
        <Bs4CircleFill />
      )}
    </div>
  )
}

export default Header
