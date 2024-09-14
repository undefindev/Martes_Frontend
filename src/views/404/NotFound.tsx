import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-cyan-400">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pagina No Encontrada</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">No pudimos encontrar la pagina que estas buscando</p>
          <div className="mt-4 flex items-center justify-center gap-x-6">
            <Link to={'/'} className="text-lg leading-7 text-purple-500">
              &larr; <span aria-hidden="true">Regresar a Projectos</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
