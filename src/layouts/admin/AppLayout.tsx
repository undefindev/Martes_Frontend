import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <header className="flex items-center p-4">
        <Navbar />
      </header>

      {/* navbar & main content */}
      <section className="flex-1">
        {/* overlay */}
        <div></div>

        {/* aside */}
        <aside>soy el aside</aside>

        {/* main content */}
        <main>
          {/* container */}
          <section>
            <Outlet />
          </section>
        </main>
        {/* footer */}
        <footer className="py-4">
          <Footer />
        </footer>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </section>


    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */
