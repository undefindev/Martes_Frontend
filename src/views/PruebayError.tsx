import { Link } from "react-router-dom"

/*
<div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    <div role="button"
      class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <div class="grid mr-4 place-items-center">
        <img alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg"
          class="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
      </div>
      <div>
        <h6
          class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
          Tania Andrew
        </h6>
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Software Engineer @ Material Tailwind
        </p>
      </div>
    </div>

*/

/* otro mas
<div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    <div role="button"
      class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      Item One
      <div class="grid ml-auto place-items-center justify-self-end">
        <button
          class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clip-rule="evenodd"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>

*/

// despues de {data.length ?...
<div>
  <nav>
    {data.map(() => (
      <Link key={project._id} to={`/projects/${project._id}`}>
        {/* left side.. data */}
        <div>
          <h6>
            {project.projectName}
          </h6>
          <p className="text-sm text-gray-400">
            {project.clientName}
          </p>
          <p className="text-sm text-gray-400">
            {project.description}
          </p>
        </div>
        {/* rigth side.. tools */}
        <div>
          <p>Editar</p>
          <p>Eliminar</p>
        </div>
      </Link>
    ))}
  </nav>
</div >



// este es el original

<ul role="list" className="mt-10">
          {data.map((project) => (
            <li key={project._id} className="bg-slate-100/50 rounded-xl flex justify-between gap-x-6 px-5 py-10">

              {/* left side.. datos del proyecto */}
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link to={`/projects/${project._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{project.projectName}</Link>
                  <p className="text-sm text-gray-400">
                    Cliente: {project.clientName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* rigth side.. menu de 3 bolitas */}
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
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
                        <Link to={`projects/${project._id}/edit`}
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
            </li>
          ))}
        </ul>