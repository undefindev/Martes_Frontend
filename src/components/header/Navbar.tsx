import { useAuth } from "@/hooks/useAuth";
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import NavMenu from "../NavMenu";
import Logo from "../Logo";
import { Link } from "react-router-dom";

export default function Navbar() {


  const { data } = useAuth()
  if (data) return (
    <>
      <div className="mx-auto container px-4 sm:px-6 lg:px-0">
        <div className="flex gap-8 lg:gap-16 justify-between h-12">
          {/* menu / logo */}
          <div className="flex gap-4 items-center flex-shrink-0">
            <button
              type="button"
              className="relative text-gray-400 hover:text-purple-600"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {/* right side */}
          <div className="flex gap-4 items-center flex-shrink-0">
            <button
              type="button"
              className="relative text-gray-400 hover:text-cyan-400"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <NavMenu name={data.name} />
          </div>
        </div>
      </div>
    </>
  )
}