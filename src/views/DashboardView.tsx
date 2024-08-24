
import { Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProject, getProjects } from "@/api/ProjectAPI"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { toast } from 'react-toastify'
import { isManager } from '../utils/policies';


export default function DashboardView() {
  const { data: user, isLoading: authLoading } = useAuth() // esto para que no choquen las variables
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  // la maldita mutacion
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })



  /* console.log(data)
  console.log(user?._id) */

  if (isLoading && authLoading) return 'Cargando..'
  if (data && user) return (
    <>
      {data.length ? (
        <ul role='list' className="divide-y divide-gray-100">
          {data.map((project) => (
            <li
              key={project._id}
              className="flex justify-between items-center py-2">
              <div className='flex w-4/12'>
                <div className='min-w-0 flex-auto'>
                  <div>
                    {isManager(project.manager, user._id) ?
                      <h5 className='block font-sans text-xs text-teal-500'>#Manager</h5>
                      :
                      <h5 className='block font-sans text-xs text-indigo-500'>#Colaborador</h5>
                    }
                  </div>

                  <Link
                    to={`/projects/${project._id}`}
                    className='font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-700 cursor-pointer'>
                    {project.projectName}
                  </Link>
                  <h6 className='block font-sans text-sm font-style: italic text-gray-500 antialiased leading-normal tracking-normal'>{project.clientName}</h6>
                  <p className=' line-clamp-2 font-serif text-base font-light leading-snug text-gray-700 '>{project.description}</p>
                </div>
              </div>

              {/* created at/ last update */}
              {/* <div className='flex items-center w-4/12'>
                <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                  {formatDate(project.createdAt)} - {formatDate(project.updatedAt)}
                </p>
              </div> */}

              {/* colaboradores */}
              {/* <div className="flex items-center justify-between w-3/12">
                <div className="flex items-center -space-x-3">
                  <img alt="natali craig"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                    className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
                  <img alt="Tania Andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
                </div>
              </div> */}


              {/* rigth side.. tools */}
              <div>
                {isManager(project.manager, user._id) && (
                  <>
                    <Menu as="div" className="relative flex-none z-20">
                      <Menu.Button className="block text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-8 w-8" aria-hidden="true" />
                      </Menu.Button>
                      <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg shadow-lg py-2 bg-white focus:outline-none"
                        >

                          <Menu.Item>
                            <Link to={`/projects/${project._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Editar Proyecto
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm leading-6 text-red-500'
                              onClick={() => mutate(project._id)}
                            >
                              Eliminar Proyecto
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>
            Mas Triste...
            <Link
              className="text-cyan-500"
              to='/projects/create'
            >
              Crear Proyecto
            </Link>
          </p>

        </div>
      )}
    </>
  )
}


/* codigo para los card en tamano mobile


  <div className="relative p-4 md:flex flex-col justify-between w-96 h-48 overflow-hidden rounded-3xl bg-white bg-clip-border text-gray-700 border"
                    key={project._id}>

                    <div className='flex justify-between'>
                      <div className='px-1'>
                        <div>
                          {isManager(project.manager, user._id) ?
                            <h5 className='block font-sans text-xs text-teal-500'>#Manager</h5>
                            :
                            <h5 className='block font-sans text-xs text-indigo-500'>#Colaborador</h5>
                          }
                        </div>

                        <Link
                          to={`/projects/${project._id}`}
                          className=' line-clamp-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900'>
                          {project.projectName}
                        </Link>
                        <h6 className='block font-sans text-sm font-style: italic text-gray-500 antialiased leading-normal tracking-normal'>{project.clientName}</h6>
                        <p className=' line-clamp-2 font-serif text-base font-light leading-snug text-gray-700 '>{project.description}</p>
                      </div>

                      {/* rigth side.. tools
                      {isManager(project.manager, user._id) && (
                        <>
                          <Menu as="div" className="relative flex-none">
                            <Menu.Button className="block text-gray-500 hover:text-gray-900">
                              <span className="sr-only">opciones</span>
                              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                            </Menu.Button>
                            <Transition as={Fragment} enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95">
                              <Menu.Items
                                className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                              >

                                <Menu.Item>
                                  <Link to={`/projects/${project._id}/edit`}
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    Editar Proyecto
                                  </Link>
                                </Menu.Item>
                                <Menu.Item>
                                  <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() => mutate(project._id)}
                                  >
                                    Eliminar Proyecto
                                  </button>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </>
                      )}

                    </div>

                    
                  </div>
*/