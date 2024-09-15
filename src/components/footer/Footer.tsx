import { SiFacebook } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { SiTwitch } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className='text-sm text-gray-400 text-center'>
        <p>
          Martes.cln &copy;
        </p>
        <p>Todos los Derechos Reservados {new Date().getFullYear()}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <SiFacebook />
          <SiInstagram />
          <FaXTwitter />
          <SiDiscord />
          <SiTwitch />
          <FaTelegramPlane />
        </div>
      </footer>
    </>
  )
}
