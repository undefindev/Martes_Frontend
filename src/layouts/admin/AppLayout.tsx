import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <Header />
      {/* navbar & main content */}
      <section className=" md:flex flex-rows items-center ">
        {/* overlay */}
        <div></div>

        {/* aside */}
        <aside></aside>

        {/* main content */}
        <main className="flex-1">
          {/* container */}
          <section>
            <Outlet />
          </section>
          {/* footer */}
          <footer className="py-4">
            <Footer />
          </footer>
        </main>


      </section>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />


    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */
