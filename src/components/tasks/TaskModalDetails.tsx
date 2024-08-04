import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslation } from '@/locales/es';
import { TaskStatus } from '@/types/index';


export default function TaskModalDetails() {
  const params = useParams()
  const projectId = params.projectId!
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  /* console.log(taskId) */

  // hacemos el modal dinamico
  const showModal = taskId ? true : false

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false
  })

  // este es el codigo de la mutacion
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] }) /* este para que se reflejen los cambio de las tareas y se reordenen */
      queryClient.invalidateQueries({ queryKey: ['task', taskId] }) /*  y este para que tenga la informacion fresca despues de hacer el cambio y se muestre en el modal correctamente */
      /* reset() */ // este verga no va aqui.. pero ahi lo vamos a dejar por si las moscas
      navigate(location.pathname, { replace: true }) // para ocultar el modal
    }
  })

  /* enviar los datos hacia updateStatus */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    /* console.log(e.target.value) */
    const status = e.target.value as TaskStatus

    const data = { projectId, taskId, status }
    /* console.log(data) */
    mutate(data)
  }

  if (isError) {
    toast.error(error.message, { toastId: 'error' })
    return <Navigate to={`/projects/${projectId}`} />
  }

  /* console.log(data) */


  if (data) return (
    <>
      <Transition appear show={showModal} as={Fragment}>
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
                  <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)} </p>
                  <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)} </p>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5"
                  >{data.name}
                  </Dialog.Title>
                  <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                  {data.completedBy && (
                    <p>
                      <span>Actualizado por:</span>{' '} {data.completedBy.name}
                    </p>
                  )}
                  <div className='my-5 space-y-3'>
                    <label className='font-bold'>Estado Actual:</label>
                    <select
                      className='w-full px-3 py-2 border rounded-md'
                      defaultValue={data.status} // para que seleccione la opcion correcta del estado
                      onChange={handleChange}
                    >
                      {Object.entries(statusTranslation).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
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

/* en el caso de <option key={key} value={key}>{value}</option> el 'key' unico es el key del objeto y el 'value' es el 'key' tambien porque es lo que le vamos a enviar al servidor. porque asi esta definido en el schema. ya que el value se paso al español para que lo pueda eer el usiario */

/* 06/03/2024.. 11:28 p.m.
hay un problema aqui con el orden de las tareas cuando las pasas de un estado a otro. se ordenan a como se crearon */