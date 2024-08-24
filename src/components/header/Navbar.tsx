import { useAuth } from "@/hooks/useAuth";
import NavMenu from "../NavMenu";
import Logo from "../Logo";
import { LuSun } from "react-icons/lu";

/* vamos a construir el breadcrumbs aqui merengues.. para no hacer otro componente */


export default function Navbar() {


  const { data } = useAuth()
  if (data) return (
    <>
      <div className="flex items-center gap-10 lg:gap-20 justify-between py-1 mx-4">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Logo />
        </div>

        {/* tools right side */}
        <div className="flex flex-shrink-0 md:gap-2 items-center">
          <LuSun />
          <NavMenu name={data.name} />
        </div>
      </div>
    </>
  )
}
