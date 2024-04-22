import Header from '@/components/store/Header'
import StoreTable from '@/components/store/StoreTable'


export default async function StoreManagement() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[65%] mt-[60px] flex flex-col gap-5 ">
        <Header />
          <StoreTable />
      </div>
    </div>
  )
}
