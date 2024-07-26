import { Fragment } from 'react'
import { Project } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {


  // la maldita mutacion
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({})
    }
  })
  return (
    <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 border"
      key={project._id}>

      <div className='flex items-center justify-between p-6'>
        <div>
          <h5 className='block font-serif text-xs pl-2 py-1'>#Category</h5>
          <h4 className='block font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-gray-900'>{project.projectName}</h4>
          <h6 className='block font-sans text-base antialiased font-normal leading-normal tracking-normal'>{project.clientName}</h6>
          <p className='block mt-3 font-sans text-base antialiased font-light leading-relaxed text-gray-700 '>{project.description}</p>
        </div>

        {/* rigth side.. tools */}
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
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <Menu.Item>
                <Link to={`/projects/${project._id}`}
                  className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                  Ver Proyecto
                </Link>
              </Menu.Item>

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
      </div>

      <div className="flex items-center justify-between p-6">
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
          January 10
        </p>
        <div className="flex items-center -space-x-3">
          <img alt="natali craig"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
            className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
          <img alt="Tania Andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
        </div>
      </div>
    </div>
  )
}
