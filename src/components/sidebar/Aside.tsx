import logo from '@/assets/logoipsum-298.svg'
import { HiArrowLeft } from "react-icons/hi";

export default function Aside({ children }) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center justify-between">
          <img
            src={logo}
            alt="logoipsum"
            className="w-4"
          />

          <button className='p-2'>
            <HiArrowLeft />
          </button>
        </div>

        <ul className='flex-1 px-2'>{children}</ul>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  return (
    <li>
      {icon}
      <span>{text}</span>
    </li>
  )
}

