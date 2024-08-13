import { Link, useLocation } from "react-router-dom"
import { Project, Task } from "../types"

type trailProjectProps = {
  projectName: Project['projectName']
}

type trailTaskProps = {
  Taskname: Task['name']
}


const Breadcrumbs = ({ projectName }: trailProjectProps, { Taskname }: trailTaskProps) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  let breadcrumbPath = ""
  return (
    <>
      <div>
        <Link to='/'>Dashboard</Link>
        {pathnames.map((name, index) => {
          breadcrumbPath += `/${name}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <span key={breadcrumbPath}> / {name}</span>
          ) : (
            <span key={breadcrumbPath}>
              {" "}
              / <Link to={breadcrumbPath}>{name}</Link>
            </span>
          )
        })}
      </div>
    </>
  )
}

export default Breadcrumbs
