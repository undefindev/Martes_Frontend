import { Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/header/Navbar'

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()
  if (isLoading) return 'Cargando...'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className='max-h-screen mx-auto container flex flex-col'>
        <Navbar />

        <main className='mx-auto container px-4 py-6 md:px-0'>
          <Outlet />
        </main>


      </div >
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */
