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
      {/* <div className='max-h-screen mx-auto container flex flex-col'>
        <Navbar />
        <div className='sticky top-0 z-10 pb-4'></div>
        <div className='overflow-hidden overflow-y-scroll'>
          <main className='mt-4'>
            <Outlet />
          </main>
        </div>
      </div > */}


      <div className='max-h-screen grid grid-rows-[auto_1fr]'>
        <div><Navbar /></div>
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

/* className='overflow-x-hidden px-4 pb-4' */
