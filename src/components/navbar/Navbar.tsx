import Logo from "../Logo";
import NavMenu from "../NavMenu";

export default function Navbar() {
  return (
    <nav className=" sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl">
      <div><Logo /></div>
      <div><NavMenu /></div>
    </nav>
  )
}
