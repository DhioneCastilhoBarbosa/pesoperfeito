import { Outlet } from 'react-router-dom'
export function AuthLayout() {
  return (
    <div className=' h-screen '>
      <div className=' flex-1 h-full'>
        <Outlet />
      </div>
    </div>
  )
}
