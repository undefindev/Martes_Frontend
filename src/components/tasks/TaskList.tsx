/*  este se encarga de mostrar las tareas en el DOM */
import { DndContext, DragEndEvent } from '@dnd-kit/core' // este viene a ser el contex del Drag n Drop
import { Task, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslation } from "@/locales/es"
import DropTask from "./DropTask"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateStatus } from '@/api/TaskAPI'
import { useParams } from 'react-router-dom'

type TaskListProps = {
  tasks: Task[]
  canEdit: boolean
}

type GroupedTasks = {
  [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

const statusStyleTop: { [key: string]: string } = {
  pending: "border-t-cyan-300",
  onHold: "border-t-sky-400",
  inProgress: "border-t-blue-500",
  underReview: "border-t-indigo-500",
  completed: "border-t-violet-600",
}


export default function TaskList({ tasks, canEdit }: TaskListProps) {

  // este es el codigo de la mutacion, que nos trajimos del 'taskModalDetails'
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      /* queryClient.invalidateQueries({ queryKey: ['task', taskId] }), esta linea ya no fue necesaria. porque? pues como dijo juan gabriel */
    }
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e
    if (over && over.id) {

      const taskId = active.id.toString()
      const status = over.id as TaskStatus

      mutate({ projectId, taskId, status })
    }
  }

  return (
    <>
      <div className="m-4 md:m-0">
        <h2 className="text-xl md:text-2xl font-sans antialiased font-semibold leading-relaxed tracking-normal text-gray-900">Tareas</h2>
        <div className='flex flex-col gap-4 md:flex-row overflow-x-scroll 2xl:overflow-auto pb-32'>
          <DndContext onDragEnd={handleDragEnd}>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
              <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                <h3
                  className={`capitalize text-xl text-center font-light rounded-lg border border-slate-300 bg-white py-2 border-t-4 ${statusStyleTop[status]}`}
                >
                  {statusTranslation[status]}
                </h3>

                {/* el drag n drop */}
                <DropTask status={status} />

                <ul className='mt-5 space-y-5'>
                  {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                  ) : (
                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                  )}
                </ul>
              </div>
            ))}
          </DndContext>
        </div>
      </div>
    </>
  )
}
