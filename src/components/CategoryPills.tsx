import { Link } from "react-router-dom";

export default function CategoryPills() {
  return (
    <>
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="">
          <h6 className="md:text-xl">Mis Proyectos</h6>
        </div>
        <nav className="my-5 ">
          <Link
            className=" bg-cyan-400 hover:bg-cyan-500 px-4 py-2 text-white rounded-lg cursor-pointer transition-colors"
            to='/projects/create'
          >Nuevo Proyecto</Link>
        </nav>
      </div>
    </>
  )
}
