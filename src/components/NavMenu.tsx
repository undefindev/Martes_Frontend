import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'
import { UserCircleIcon } from '@heroicons/react/24/outline'

type NavMenueProps = {
  name: User['name']
}

export default function NavMenu({ name }: NavMenueProps) {

  /* limpiar el token  e invalidamos el query*/
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1">
        <button
          type="button"
          className="relative rounded-full text-gray-400 hover:text-purple-600"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon aria-hidden="true" className="h-8 w-8" />
        </button>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute bg-white left-1/2 z-20 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl p-4 text-sm font-semibold leading-6 shadow-lg ring-1">
            <p className='text-center'>Hola: {name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-purple-950'
            >Mi Perfil</Link>
            <Link
              to='/'
              className='block p-2 hover:text-purple-950'
            >Mis Proyectos</Link>
            <button
              className='block p-2 hover:text-purple-950'
              type='button'
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}