import { useAuth } from "@/hooks/useAuth";
import NavMenu from "../NavMenu";
import Logo from "../Logo";

/* vamos a construir el breadcrumbs aqui merengues.. para no hacer otro componente */


export default function Navbar() {


  const { data } = useAuth()
  if (data) return (
    <>
      <div className="flex gap-10 lg:gap-20 justify-between">
        <Logo />
        <div>
          <NavMenu name={data.name} />
        </div>
      </div>
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