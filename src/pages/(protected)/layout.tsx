import MenuBar from '@/components/MenuBar'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingScreen from './loading'

function ProtectedLayout() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
        <MenuBar />
      </div>
    </Suspense>
  )
}

export default ProtectedLayout
