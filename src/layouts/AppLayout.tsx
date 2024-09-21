import { Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/header/Navbar'
import Footer from '@/components/footer/Footer'

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()
  if (isLoading) return 'Cargando...'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className='max-h-screen grid grid-rows-[auto_1fr]'>
        <Navbar />
        <div className='overflow-hidden overflow-y-scroll'>
          <Outlet />
          <Footer />
        </div>
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */

/* 
  className='grid grid-cols-[auto,1fr] overflow-auto'
*/

