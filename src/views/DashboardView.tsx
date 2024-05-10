import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectAPI"

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return 'Cargando..'
  console.log(data)

  return (
    <>
      <div className="flex justify-between container mx-auto">
        <div>
          <h2 className="text-5xl font-black">Mi Proyectos</h2>
          <p className="text-2xl font-light text-gray-500 mt-2">Maneja y Administra tu Malditos Projectos</p>
        </div>

        <nav className="my-4">
          <Link
            to='/projects/create'
            className="px-8 py-2 border rounded-md font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
            Nuevo Proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
