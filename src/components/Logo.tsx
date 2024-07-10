import { Link } from "react-router-dom";

export default function Logo() {
  return (
    // <img src="/logo.svg" alt="logo.svg" />
    <Link to={'/'}><p>Martes.com</p></Link>
  )
}
