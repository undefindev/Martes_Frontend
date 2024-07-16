import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import CategoryPills from "@/components/CategoryPills";



export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="max-h-screen flex flex-col">
        <Header />
        {/* navbar & main content */}
        <div className="grid grid-cols-[auto_1fr] flex-grow overflow-auto">
          {/* aside */}
          <aside>sidebar</aside>
          <div className=" overflow-x-hidden px-8 pb-4">
            {/* categories */}
            <div className=" sticky top-0 z-10 pb-4">
              <CategoryPills />
            </div>

            {/* main content */}
            <div>
              <Outlet />
            </div>

            <footer className="py-4">
              <Footer />
            </footer>
          </div>

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
