import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"

export default function ProjectDetailsView() {

  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isLoading) return '..Cargando'
  if (isError) return <Navigate to='/404' />
  if (data) return (
    <>
      <h2 className="text-4xl font-semibold">{data.projectName}</h2>
      <p className=" font-light mt-4">{data.description}</p>
      <nav className="my-5 flex gap-2">
        <button
          type="button"
          value="Guardar Cambios"
          onClick={() => navigate(location.pathname + '?newTask=true')}
          className="border rounded-lg py-2 px-4 font-semibold hover:bg-slate-900 hover:text-white cursor-pointer transition-colors"
        >Nueva Tarea</button>

        <Link
          to={'team'}
          className="border rounded-lg py-2 px-4 font-semibold hover:bg-slate-900 hover:text-white cursor-pointer transition-colors"
        >
          Colaboradores
        </Link>
      </nav>

      <TaskList
        tasks={data.tasks}
      />


      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
