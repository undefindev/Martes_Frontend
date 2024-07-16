import { useAuth } from "@/hooks/useAuth";
import NavMenu from "../NavMenu";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { ArrowLeft, Bell, Menu, Mic, Search, Users } from "lucide-react";
import Button from "../Button";
import { useState } from "react";

export default function Header() {

  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)

  const { data } = useAuth()
  if (data) return (
    <>
      <div className="flex justify-between items-center gap-8 lg:gap-16 pt-2 mb-4 mx-4">
        {/* aside & logo */}
        <div className={`items-center flex-shrink-0 gap-4 ${showFullWidthSearch ? "hidden" : "flex"}`}>
          <Button variant='ghost' size='icon'>
            <Menu />
          </Button>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        {/* search bar */}
        <form className={`flex-grow justify-center gap-4 ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>

          {showFullWidthSearch && (
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => setShowFullWidthSearch(false)}
              className="flex-shrink-0"
            >
              <ArrowLeft />
            </Button>
          )}

          {/* la barrita de busqueda */}
          <div className="flex flex-grow max-w-[600px]">
            <input
              type="search"
              placeholder="Search"
              className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
            />
            <Button className="py-1 px-3 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
              <Search />
            </Button>
          </div>

          {/* microchono */}
          <Button size="icon" type="button" className="flex-shrink-0">
            <Mic />
          </Button>
        </form>

        {/* sign in & team colaborators */}
        <div className={`flex-shrink-0 items-center md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>
          {/* notifications */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setShowFullWidthSearch(true)}
          >
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


/* {showFullWidthSearch && (
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => setShowFullWidthSearch(false)}
              className="flex-shrink-0"
            >
              <ArrowLeft />
            </Button>
          )} 
          que no se nos olvide esto.. o se esta mostrando la barra completa entonces escondela  
          */