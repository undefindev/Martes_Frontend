import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <>
      <div className="md:flex items-center justify-between py-2">
        <Link to={'/'}>
          <Logo />
        </Link>
        <NavMenu />
      </div>
    </>
  )
}
