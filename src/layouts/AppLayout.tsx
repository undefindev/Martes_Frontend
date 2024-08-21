// esta es la vista principal despues de login..
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/header/Navbar";
import Trails from "@/components/Trails";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="bg-teal-100 max-h-screen flex flex-col">
        {/* navbar */}
        <Navbar />
        {/* main Content */}
        <main className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto">
          <aside className="bg-rose-100">Sidebar</aside>
          <div className="sticky top-0 bg-gray-100 z-10 p-4">
            <Trails />
            <Outlet />
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
