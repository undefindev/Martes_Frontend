import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
  return (

    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-96">
          <div className="overflow-hidden">
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
