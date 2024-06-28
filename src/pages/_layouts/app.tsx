import { Outlet } from 'react-router-dom'
import { Header } from '../app/components/header'
export function AppLayout() {
  return (
    <div className=' h-screen '>
      <Header/>
      <div className='max-w-[1550px] mx-auto py-5 flex flex-col gap-5 h-full justify-center'>
        <Outlet />
      </div>
    </div>
  )
}
