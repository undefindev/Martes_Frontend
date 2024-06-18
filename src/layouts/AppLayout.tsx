import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/Header";

export default function AppLayout() {
  return (
    <>
      <div className="container mx-auto">
        <Header />
        <main>
          <Outlet />
        </main>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </>
  )
}

/* h-screen grid grid-rows-[auto_1fr_auto] */
