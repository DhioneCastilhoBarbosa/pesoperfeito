import { Outlet } from 'react-router-dom'
import { Header } from '../app/components/header'
export function AppLayout() {
  return (
    <div>
      <Header/>
      <div className='max-w-[1320px] mx-auto py-5 flex flex-col gap-5'>
        <Outlet />
      </div>
    </div>
  )
}
