import { LuChevronFirst } from "react-icons/lu";



export default function Sidebar() {
  return (
    <aside className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-gray-100">
      <nav className="h-full flex flex-col bg-white">
        <div className="p-4 pb-2 flex justify-between items-center">
          <p>M</p>
          <button>
            <LuChevronFirst />
          </button>
        </div>
      </nav>
    </aside>
  )
}
