import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

export default function ProjectDetailsView() {

  const { data: user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false
  })

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]) // puede editar o no?

  if (isLoading && authLoading) return '..Cargando'
  if (isError) return <Navigate to='/404' />
  if (data && user) return (
    <>
      <h2 className="text-3xl text-indigo-500 font-semibold">{data.projectName}</h2>
      <p className="w-3/4 line-clamp-2 font-light	font-style: italic text-lg text-start antialiased leading-relaxed tracking-normal text-gray-500 mt-2">
        {data.description}
      </p>

      {isManager(data.manager, user._id) && (
        <nav className="flex gap-2 my-4">
          <button
            type="button"
            onClick={() => navigate(location.pathname + '?newTask=true')}
            className="bg-cyan-400 hover:bg-cyan-500 px-6 py-2 rounded-lg text-white font-semibold cursor-pointer transition-colors"
          >
            Nueva Tarea
          </button>

          <Link
            to={'team'}
            className="bg-cyan-400 hover:bg-cyan-500 px-8 py-2 rounded-lg text-white font-semibold cursor-pointer transition-colors"
          >
            Colaboradores
          </Link>

          <Link
            to={'/'}
            className="bg-cyan-400 hover:bg-cyan-500 px-6 py-2 rounded-lg text-white font-semibold cursor-pointer transition-colors"
          >
            Volver al Projecto
          </Link>
        </nav>
      )}

      <TaskList
        tasks={data.tasks}
        canEdit={canEdit}
      />


      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}

/* la diferencia entre 'link' y 'button' es que el button ejecuta una accion, el link nada mas lleva o redirigue */
