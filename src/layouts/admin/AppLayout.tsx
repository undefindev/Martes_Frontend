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
      <div className="flex h-full w-full">
        {/* aqui va el aside o sidebar */}
        {/* navbar & main content */}
        <div className="h-full w-full">
          {/* main content */}
          <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
            <div className="h-full">
              <Navbar />
              {/* main content */}
              <section className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Outlet />
              </section>
              {/* footer */}
              <div className="p-3">
                <Footer />
              </div>
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
