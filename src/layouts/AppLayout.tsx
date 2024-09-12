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
        <div className='sticky top-0 z-10 overflow-x-hidden overflow-y-scroll'>
          <main className='mt-4'>
            <Outlet />
          </main>
        </div>
      </div >
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */

/* 
  className='grid grid-cols-[auto,1fr] overflow-auto'
*/

/* className='overflow-x-hidden px-4 pb-4' */
