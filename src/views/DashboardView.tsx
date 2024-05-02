import { Link } from "react-router-dom"

export default function DashboardView() {
  return (
    <>
      <h2 className="text-4xl">Mi Proyectos</h2>
      <nav className="mt-4">
        <Link
          to='/projects/create'
          className="px-8 py-2 border border-slate-900 rounded-md font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  )
}
