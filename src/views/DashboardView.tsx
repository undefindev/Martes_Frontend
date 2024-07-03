import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject, getProjects } from "@/api/ProjectAPI"
import { toast } from 'react-toastify'

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

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

  if (isLoading) return 'Cargando..'
  /* console.log(data) */
  if (data) return (
    <>
      <div className='container mx-auto flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-around mt-8'>
        <div className="text-center md:text-justify">
          <h2 className="text-xl md:text-2xl font-sans antialiased font-semibold leading-relaxed tracking-normal text-gray-900">Mis Proyectos</h2>
          {/* <p className="font-light text-gray-500">aqui los Malditos Proyectos..!!</p> */}
        </div>
        <nav>
          <Link
            to='/projects/create'
            className="bg-indigo-500/10 md:bg-transparent px-4 py-2 font-sans text-xl font-semibold text-center antialiased leading-relaxed tracking-normal text-indigo-500 align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-indigo-500/25 md:hover:bg-indigo-500/10 active:bg-indigo-700/20">
            Nuevo Proyecto
          </Link>
        </nav>
      </div>
      {data.length ? (
        <div>
          <div className="relative flex flex-col text-gray-700 w-full rounded-xl bg-clip-border mt-12">
            <nav className="flex min-w[240px] flex-col gap-4 p-2 font-sans text-base font-normal text-gray-700">
              {data.map((project) => (
                <div
                  className="flex gap-4"
                  key={project._id}
                >
                  <Link
                    to={`/projects/${project._id}`}
                    className="flex items-center w-full p-3 py-4 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-100 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900"
                  >
                    {/* left side.. data */}
                    <div className="w-3/4">
                      <h6 className="block font-sans text-xl text-start antialiased font-semibold leading-relaxed tracking-normal text-gray-900">
                        {project.projectName}
                      </h6>
                      <p className="block font-sans text-base antialiased font-light leading-normal">
                        {project.clientName}
                      </p>
                      <p className="block font-sans text-base antialiased font-normal leading-normal text-ellipsis">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                  {/* rigth side.. tools */}
                  <div className="grid ml-auto place-items-center justify-self-end w-auto mr-4">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`projects/${project._id}/edit`}
                        className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </span>
                      </Link>
                      <button
                        type='button'
                        onClick={() => mutate(project._id)}
                        className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-indigo-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div >
        </div>
      ) : (
        <p className="text-center py-20">
          Mas Triste.. {''}
          <Link
            to='/projects/create'
            className="text-indigo-500 text-xl font-semibold hover:text-indigo-700 cursor-pointer transition-colors">
            Crear Proyecto
          </Link>
        </p>
      )}
    </>
  )
}
