import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { ListTodo, Undo2, UserPlus } from "lucide-react"

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
      <div className="flex items-center justify-between my-4 container mx-auto">
        <div>
          <h2 className="text-3xl text-indigo-500 uppercase font-semibold">{data.projectName}</h2>
          <p className="block font-serif 	font-style: italic text-xl text-start antialiased leading-relaxed tracking-normal text-gray-500 mt-2">{data.description}</p>
        </div>
        <nav className="flex items-center gap-2">
          <button
            type="button"
            value="Guardar Cambios"
            onClick={() => navigate(location.pathname + '?newTask=true')}
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <ListTodo />
            </span>
          </button>

          <Link
            to={'team'}
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <UserPlus />
            </span>
          </Link>

          <Link
            to={'/projects'}
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Undo2 />
            </span>
          </Link>
        </nav>
      </div>

      <TaskList
        tasks={data.tasks}
      />


      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}

/* la diferencia entre 'link' y 'button' es que el button ejecuta una accion, el link nada mas lleva o redirigue */
