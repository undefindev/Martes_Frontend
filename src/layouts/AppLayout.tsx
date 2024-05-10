import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/aside/Sidebar";

export default function AppLayout() {
  return (
    <>
      <div className="h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        <section className="flex">
          <Sidebar />
          <main className="md:flex flex-1 md:overflow-y-scroll px-4">
            <Outlet />
          </main>
        </section>
        <Footer />
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </>
  )
}
