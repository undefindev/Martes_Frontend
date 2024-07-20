import AddMemberModal from "@/components/team/AddMemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"



export default function ProjectTeamView() {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  return ( 
    <>
      <h2 className="text-4xl font-semibold">Administrar el Equipo</h2>
      <p className=" font-light mt-4">Administra el equipo de trabajo para este projecto</p>
      <nav className="my-5 flex gap-2">
        <button
          type="button"
          value="Guardar Cambios"
          onClick={() => navigate(location.pathname + '?addMember=true')}
          className="border rounded-lg py-2 px-4 font-semibold hover:bg-slate-900 hover:text-white cursor-pointer transition-colors"
        >Agregar Colaborador</button>

        <Link
          to={`/projects/${projectId}`}
          className="border rounded-lg py-2 px-4 font-semibold hover:bg-slate-900 hover:text-white cursor-pointer transition-colors"
        >
          Volver al Projecto
        </Link>
      </nav>

      <AddMemberModal />
    </>
  )
}
