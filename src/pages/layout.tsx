import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <main className="max-w-md mx-auto h-dynamic-screen">
      <Outlet />
    </main>
  )
}
