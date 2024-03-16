import { BackgroundGradient } from '@/components/ui/background-gradient'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-zinc-900 p-12 text-white flex flex-col justify-between items-center">
        <div className="flex rounded-[22px] justify-center items-center h-full">
          <BackgroundGradient className="rounded-[22px] w-[250px] h-[250px] max-w-sm p-4 sm:p-10 bg-zinc-900 dark:bg-zinc-900">
            <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
              <div className="text-7xl font-bold">BCS</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Buyer Connect Seller
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  )
}
