import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/aside/Sidebar";

export default function AppLayout() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <section className="flex flex-1">
          <Sidebar />
          <main>
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
