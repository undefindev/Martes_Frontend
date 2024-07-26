
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectAPI"
import ProjectCard from '@/components/projects/ProjectCard'


export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return 'Cargando..'
  /* console.log(data) */
  if (data) return (
    <>
      <div>
        <h2 className="my-4">Projectos</h2>
        <div>
          <ul>
            {data.length ? (
              <li className="grid gap-4 grid-cols-[repeat(auto-fill, minmax(300px,1fr))]">
                {data.map(project => <ProjectCard key={project._id} project={project} />)}
              </li>
            ) : (
              <p>mas triste</p>
            )}
          </ul>
        </div>
      </div>




    </>
  )
}


/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg> */