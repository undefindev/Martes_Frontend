import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
  return (

    <>
      <div className="bg-slate-100 min-h-screen">
        <div className="py-8 lg:py-16 mx-auto w-[450px]">
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />

    </>
  )
}
