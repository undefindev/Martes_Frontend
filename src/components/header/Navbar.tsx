import { useAuth } from "@/hooks/useAuth";
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import NavMenu from "../NavMenu";
import Logo from "../Logo";
import { Link } from "react-router-dom";

export default function Navbar() {


  const { data } = useAuth()
  if (data) return (
    <>
      <div className="mx-auto container px-4 py-1 sm:px-6 lg:px-0">
        <div className="flex gap-4 lg:gap-8 justify-between h-12">
          {/* menu / logo */}
          <div className="flex gap-4 items-center flex-shrink-0">
            <Bars3Icon aria-hidden="true" className="h-6 w-6 text-gray-400 hover:text-purple-600" />
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {/* right side */}
          <div className="flex gap-4 items-center flex-shrink-0">
            <BellIcon aria-hidden="true" className="h-6 w-6 text-gray-400 hover:text-cyan-400" />
            <NavMenu name={data.name} />
          </div>
        </div>
      </div>
    </>
  )
}