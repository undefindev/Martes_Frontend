import { Disclosure } from '@headlessui/react'
import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
import Footer from '@/components/footer/Footer'

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()
  if (isLoading) return 'Cargando...'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className='min-h-full'>
        <Disclosure as='nav'>
          <div className='mx-auto container px-4 md:px-0'>
            <div className='flex h-16 items-center justify-between'>
              <Link to={'/'}>
                <Logo />
              </Link>
              <NavMenu name={data.name} />
            </div>
          </div >
        </Disclosure >

        <main className='mx-auto container px-4 py-6 md:px-0'>
          <Outlet />
        </main>

        <Footer />
      </div >
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */
