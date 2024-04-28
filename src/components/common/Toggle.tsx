import { Switch } from '@/components/ui/switch'

const Toggle = ({ status, onCheckedHandler }: { status: boolean; onCheckedHandler: () => void }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={status} onCheckedChange={onCheckedHandler} />
    </div>
  )
}

export default Toggle
