import { Link } from "react-router-dom";

export default function Logo() {
  return (
    // <img src="/logo.svg" alt="logo.svg" />
    <Link to={'/'}><h1 className="text-cyan-500">Martes.com</h1></Link>
  )
}
