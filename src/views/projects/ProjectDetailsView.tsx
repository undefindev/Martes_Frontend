import { Navigate, useNavigate, useParams } from "react-router-dom"
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
    queryKey: ['project', projectId],
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
          className="border border-slate-500 rounded-lg py-2 px-4 hover:bg-slate-900 hover:text-white cursor-pointer transition-colors"
        >Agregar Tarea</button>
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
