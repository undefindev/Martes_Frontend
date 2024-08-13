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
      <div className="max-h-screen flex flex-col">
        {/* navbar & main content */}
        <div className="h-full">
          <Navbar />
        </div>
        {/* main Content */}
        <main className={`h-full flex-none transition-all`}>
          <div className="pt-5s mx-auto  mb-auto h-full min-h-[84vh p-2 md:pr-2]">
            <Outlet />
          </div>
        </main>
        <div>
          <Footer />
        </div>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */
