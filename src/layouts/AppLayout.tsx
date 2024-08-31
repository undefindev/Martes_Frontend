// esta es la vista principal despues de login..
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/header/Navbar";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="min-h-full">
        <div className="mx-auto container px-4 sm:px-6 lg:px-6">
          <Navbar />

          {/* mian */}
          <main>
            <div className="mx-auto container px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>

          {/* footer */}
          <footer className='text-sm text-gray-500 text-center font-light'>
            <p>
              Martes.org - by 'a la Huevona..'
            </p>
            <p>Todos los Derechos Reservados {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */
