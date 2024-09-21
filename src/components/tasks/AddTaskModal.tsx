/* este archivo es para crear una tarea y mostrarla en pantalla */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
  const navigate = useNavigate()

  /* miramos si existe el modal */
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const show = modalTask ? true : false

  /* obteneomos el 'projectId' */
  const params = useParams()
  const projectId = params.projectId!

  const initialValues: TaskFormData = {
    name: "",
    description: ""
  }


  // crear una tarea
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] }) // esta mamada es para que se muestre en la pantalla despues de crear la tarea
      toast.success(data)
      reset() // limpia el maldito formulario
      navigate(location.pathname, { replace: true }) // para ocultar el modal
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}> {/* este es para ocultar el modal */}
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
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle transition-all px-8 py-16">
                  <div className="text-center">
                    <h3 className='text-2xl font-semibold leading-6 tracking-tight text-gray-700'>Nueva Tarea</h3>
                    <p className="mt-1 leading-6 text-gray-500">
                      Llena el formulario y crea una tarea
                    </p>

                  </div>



                  <div className='mt-20 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form
                      noValidate
                      onSubmit={handleSubmit(handleCreateTask)}
                      className='space-y-6'
                    >
                      <TaskForm
                        register={register}
                        errors={errors}
                      />
                      <input
                        type="submit"
                        value="guardar tareas"
                        className='flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize'
                      />
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}