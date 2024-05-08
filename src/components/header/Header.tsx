import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <>
      <div className="md:container mx-auto flex items-center justify-between py-4">
        <Logo />
        <NavMenu />
      </div>
    </>
  )
}
