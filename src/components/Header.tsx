import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Link to={'/'}>
          <Logo />
        </Link>
        <NavMenu />
      </div>
    </>
  )
}
