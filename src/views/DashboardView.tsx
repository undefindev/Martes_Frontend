import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjects } from "@/api/ProjectAPI"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

export default function DashboardView() {

  const location = useLocation()
  const navigate = useNavigate()
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })
  if (isLoading && authLoading) return 'Cargando...'
  if (data && user) return (
    <>
      <div className='mx-auto container px-2'>
        <div className='flex flex-col'>
          {/* top */}
          <div className='flex items-center justify-around sticky top-0 bg-white pt-1 pb-3 z-10'>
            <h2 className="text-2xl font-semibold leading-6 tracking-tight text-gray-700">Mis Proyectos</h2>
            <nav>
              <Link
                className="w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                to='/projects/create'
              >
                Nuevo Proyecto
              </Link>
            </nav>
          </div>

          {/* body */}
          <div>
            {data.length ? (
              <ul role="list">
                {data.map((project) => (
                  <li key={project._id} className="flex justify-between hover:bg-neutral-100 hover:rounded-2xl my-4">
                    <div className="flex min-w-0 gap-x-1 px-4 py-2">
                      <div className="min-w-0 flex-auto space-y-2">
                        <div>
                          {isManager(project.manager, user._id) ?
                            <p className='font-semibold text-xs text-indigo-500'>Manager</p> :
                            <p className='font-semibold text-xs text-cyan-500'>Colaborador</p>
                          }
                        </div>
                        <div className='space-y-1'>
                          <Link to={`/projects/${project._id}`}
                            className="block text-gray-900"
                          >
                            {project.projectName}
                          </Link>
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-500">
                            Cliente: {project.clientName}
                          </p>
                          <p className="text-base text-gray-700 mt-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                      <Menu as="div" className="relative flex-none">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                          <span className="sr-only">opciones</span>
                          <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                        </MenuButton>
                        <Transition as={Fragment} enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95">
                          <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-700/5 focus:outline-none"
                          >
                            <MenuItem>
                              <Link to={`/projects/${project._id}`}
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                Ver Proyecto
                              </Link>
                            </MenuItem>
                            {isManager(project.manager, user._id) && (
                              <>
                                <MenuItem>
                                  <Link to={`/projects/${project._id}/edit`}
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    Editar Proyecto
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                  >
                                    Eliminar Proyecto
                                  </button>
                                </MenuItem>
                              </>
                            )}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-20">No hay proyectos aún {''}
                <Link
                  to='/projects/create'
                  className=" text-fuchsia-500 font-bold"
                >Crear Proyecto</Link>
              </p>
            )}
            <DeleteProjectModal />
          </div>
        </div>
      </div>
    </>
  )
}


/* 
  <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
*/