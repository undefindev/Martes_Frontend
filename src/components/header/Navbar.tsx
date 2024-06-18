import Container from "../Container";
import Logo from "../Logo";


export default function Navbar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-2 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
          </div>
        </Container>
      </div>
    </div>
  )
}
