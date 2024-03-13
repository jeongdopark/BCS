import { toast } from '@/components/ui/use-toast'

interface IProps {
  title: string
  description: string
  mode: 'success' | 'fail'
}

const Toast = ({ title, description, mode }: IProps) => {
  return toast({
    title,
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code
          className={`${mode === 'success' ? 'text-white' : 'text-red-500'}`}
        >
          {description}
        </code>
      </pre>
    ),
  })
}

export default Toast
