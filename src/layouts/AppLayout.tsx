// esta es la vista principal despues de login..
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/header/Navbar";
import CategoryPills from "@/components/CategoryPills";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="p-4 lg:p-0 lg:container mx-auto">
        <header>
          <Navbar />
        </header>

        <section>
          <div className="sticky top-0 z-10 pb-4">
            <CategoryPills />
            <div>
              <div >
                <Outlet />
              </div>
            </div>
          </div>
        </section>

        <footer className='text-sm text-gray-500 text-center font-light'>
          <p>
            Martes.org - by 'a la Huevona..'
          </p>
          <p>Todos los Derechos Reservados {new Date().getFullYear()}</p>
        </footer>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */
