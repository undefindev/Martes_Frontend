import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <>
      <div className="grid grid-rows-3">
        <header className="py-2">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-32">
              <Logo />
            </div>
            <NavMenu />
          </div>
        </header>
        <section className="container mx-auto mt-8 p-4">
          <div className="grid grid-cols-2">
            <div>sidebar</div>
            <Outlet />
          </div>
        </section>
        <footer className="py-4">
          <div className="flex flex-col items-center">
            <p>kitchen by.. a la huevona..!!</p>
            <p>todos los derechos reservados alimentate sanamente come frutas y verduras {new Date().getFullYear()}</p>
          </div>
        </footer>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </div>
    </>
  )
}
