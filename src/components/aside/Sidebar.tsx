import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="min-w-24 p-4">
      <nav>
        <Link
          to='/projects/create'
          className="px-8 py-2 border border-slate-900 rounded-md font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
          Nuevo Proyecto
        </Link>
      </nav>
    </aside>
  )
}
