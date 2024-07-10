import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/admin/footer/Footer";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/sidebar/Aside";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return 'Cargando..'
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="flex h-full w-full">
        <aside><Aside /></aside>
        <div className="h-full w-full">
          <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
            <div className="h-full">
              <header>
                <Header />
              </header>
              <section className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                <Outlet />
              </section>
              <footer>
                <Footer />
              </footer>
              <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */
