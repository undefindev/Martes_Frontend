/* este muestra el formulario para editar */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
  data: Task
  taskId: Task['_id']
}

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate()

  /* obteneomos el 'projectId' */
  const params = useParams()
  const projectId = params.projectId!

  // instanciamos useForm
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description
    }
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true }) // para ocultar el modal
    }
  })

  const handleEditTask = (formData: TaskFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    }
    mutate(data)
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title
                  as="h3"
                  className="font-black text-4xl  my-5"
                >
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form
                  onSubmit={handleSubmit(handleEditTask)}
                  noValidate
                  className="mt-10 space-y-3"
                >

                  <TaskForm
                    register={register}
                    errors={errors}
                  />

                  <input
                    type="submit"
                    className=" block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value='Guardar Tarea'
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
