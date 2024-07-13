import { useAuth } from "@/hooks/useAuth";
import NavMenu from "../NavMenu";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Bell, Menu, Mic, Search, Users } from "lucide-react";
import Button from "../Button";

export default function Header() {
  const { data } = useAuth()
  if (data) return (
    <>
      <div className="flex justify-between items-center gap-8 lg:gap-16 pt-2 mb-6 mx-4">
        {/* aside & logo */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <Button>
            <Menu />
          </Button>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        {/* search bar */}
        <form className="hidden md:flex flex-grow justify-center gap-4">
          <div className="flex flex-grow max-w-[600px]">
            <input
              type="search"
              placeholder="Search"
              className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
            />
            <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
              <Search />
            </Button>
          </div>

          <Button size="icon" type="button" className="flex-shrink-0">
            <Mic />
          </Button>
        </form>

        {/* sign in & team colaborators */}
        <div className="flex flex-shrink-0 items-center md:gap-2">
          {/* notifications */}
          <Button size="icon" variant="ghost" className="md:hidden">
            <Search />
          </Button>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Mic />
          </Button>

          <Button size="icon" variant="ghost">
            <Bell />
          </Button>

          {/* team or colaboradores */}
          <div>
            <Button size="icon" variant="ghost">
              <Users />
            </Button>
          </div>

          {/* login n=menu */}
          <Button size="icon" variant="ghost">
            <NavMenu name={data.name} />
          </Button>

        </div>

      </div >
    </>
  )
}
