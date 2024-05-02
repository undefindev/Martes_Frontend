import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export default function AppLayout() {
  return (
    <>
      <header className="py-2">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-32">
            <Logo />
          </div>
        </div>
      </header>
      <section className="container mx-auto mt-8 p-4">
        <Outlet />
      </section>
      <footer className="py-4">
        <div className="flex flex-col items-center">
          <p>kitchen by.. a la huevona..!!</p>
          <p>todos los derechos reservados alimentate sanamente come frutas y verduras {new Date().getFullYear()}</p>
        </div>
      </footer>

    </>
  )
}
