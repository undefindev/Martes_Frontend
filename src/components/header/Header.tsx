import { useAuth } from "@/hooks/useAuth";
import NavMenu from "../NavMenu";

export default function Header() {
  const { data } = useAuth()
  if (data) return (
    <>
      <div className="flex justify-between items-center gap-8 lg:gap-16">
        {/* aside */}
        {/* logo */}
        {/* sign in & team colaborators */}
        <div>
          {/* team or colaboradores */}
          {/* admin */}
          <div className="border rounded-full">
            <NavMenu name={data.name} />
          </div>
        </div>

      </div>
    </>
  )
}
