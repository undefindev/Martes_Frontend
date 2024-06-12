/*  este se encarga de mostrar las tareas en el DOM */
import { Task } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslation } from "@/locales/es"

type TaskListProps = {
  tasks: Task[]
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

/* const statusStyle: { [key: string]: string } = {
  pending: "border-cyan-300",
  onHold: "border-sky-400",
  inProgress: "border-blue-500",
  underReview: "border-indigo-500",
  completed: "border-violet-600",
} */

const statusStyleTop: { [key: string]: string } = {
  pending: "border-t-cyan-300",
  onHold: "border-t-sky-400",
  inProgress: "border-t-blue-500",
  underReview: "border-t-indigo-500",
  completed: "border-t-violet-600",
}


export default function TaskList({ tasks }: TaskListProps) {

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  /* console.log(groupedTasks) */
  return (
    <>
      <div className="m-4 md:m-0">
        <h2 className="text-xl md:text-2xl font-sans antialiased font-semibold leading-relaxed tracking-normal text-gray-900">Tareas</h2>
        <div className='flex flex-col gap-4 md:flex-row overflow-x-scroll 2xl:overflow-auto pb-32'>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
              <h3
                className={`capitalize text-xl text-center font-light rounded-lg border border-slate-300 bg-white py-2 border-t-4 ${statusStyleTop[status]}`}
              >
                {statusTranslation[status]}
              </h3>
              <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                ) : (
                  tasks.map(task => <TaskCard key={task._id} task={task} />)
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
