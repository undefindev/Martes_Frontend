// esta es la vista principal despues de login..
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div>
        <aside>M</aside>
        {/* main Content */}
        <main>
          {/* navbar & main content */}
          <div>
            <Navbar />
          </div>
          <div>
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </main>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr] */
