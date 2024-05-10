import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-48 p-4 border-r">
      <nav>
        <Link
          to='/'
          className="block px-8 py-2 rounded-md font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
          Home
        </Link>
      </nav>
    </aside>
  )
}
