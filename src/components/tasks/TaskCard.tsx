import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { EllipsisVerticalIcon } from 'lucide-react'

type TaskCardProps = {
  task: Task
  canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!


  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
    }
  })

  return (
    <li className="relative p-4 bg-white border border-cyan-400 rounded-xl flex justify-between gap-2">
      <div className=" min-w-0 flex flex-col gap-y-4">
        <button
          type='button'
          onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
          className="text-xl font-bold text-slate-600 text-left">{task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type='button'
                  onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                  className='block px-3 py-1 text-sm leading-6 text-gray-900'
                >
                  Ver Tarea
                </button>
              </Menu.Item>

              {canEdit && (
                <>
                  <Menu.Item>
                    <button
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 text-gray-900'
                      onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                    >
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 text-red-500'
                      onClick={() => mutate({ projectId, taskId: task._id })}
                    >
                      Eliminar Tarea
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}

/* el modificado
  <div>
      <nav>
        <div
          key={task._id}
          /* to={`/tasks/${task._id}`} */
/* className="bg-indigo-50/50 flex flex-col gap-4 items-center w-full p-3 py-4 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-100 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900" */

/* top side */
/* <div className="w-full">
  <h6
    className="block font-serif 	font-style: italic text-xl text-start antialiased leading-relaxed tracking-normal text-gray-500"
  >
    {task.name}
  </h6>
  <p>{task.description}</p>
</div> */

/* bottom side */
/* <div className="grid ml-auto place-items-center justify-self-end w-full mr-2">
  <div className='flex items-center gap-4'> */
/* ver tarea */
/* <button
  type='button'
  onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
  className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
  <span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
    </svg>

  </span>
</button> */

/* editar tarea */
/* <button
  type='button'
  onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
  className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  </span>
</button> */

/* eliminar tarea */
/* <button
  type='button'
  onClick={() => mutate({ projectId, taskId: task._id })}
  className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  </span>
</button>
</div>
</div>
</div>
</nav>
</div> */

