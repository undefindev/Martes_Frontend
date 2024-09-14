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
      <div className="mx-auto container px-2">
        <div className="flex flex-col">
          {/* header */}
          <div className="flex flex-col items-center sticky top-0 bg-white py-2">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">{data.projectName}</h2>
              <p className="font-light font-style: italic text-lg antialiased leading-relaxed tracking-normal text-gray-500">
                {data.description}
              </p>
            </div>

            {isManager(data.manager, user._id) && (
              <nav className="flex my-4">
                <button
                  type="button"
                  onClick={() => navigate(location.pathname + '?newTask=true')}
                  className="text-gray-400 hover:bg-purple-400 hover:text-white
                          rounded-md px-3 py-2 text-sm font-medium"
                >
                  Nueva Tarea
                </button>

                <Link
                  to={'team'}
                  className="text-gray-400 hover:bg-purple-400 hover:text-white
                          rounded-md px-3 py-2 text-sm font-medium"
                >
                  Colaboradores
                </Link>

                <Link
                  to={'/'}
                  className="text-gray-400 hover:bg-purple-400 hover:text-white
                          rounded-md px-3 py-2 text-sm font-medium"
                >
                  Volver al Projecto
                </Link>
              </nav>
            )}
          </div>
          {/* body */}
          <TaskList
            tasks={data.tasks}
            canEdit={canEdit}
          />


          <AddTaskModal />
          <EditTaskData />
          <TaskModalDetails />
        </div>
      </div>



    </>
  )
}

/* la diferencia entre 'link' y 'button' es que el button ejecuta una accion, el link nada mas lleva o redirigue */
