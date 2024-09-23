import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/api/AuthAPI';
import { toast } from 'react-toastify';
import { deleteProject } from '@/api/ProjectAPI';


export default function DeleteProjectModal() {
  const initialValues: CheckPasswordForm = {
    password: ''
  }
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const show = deleteProjectId ? true : false

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast.error(error.message)
  })

  // la maldita mutacion
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate(location.pathname, { replace: true }) // cerramos el modal
    }
  })


  // esta mamada es cuando tienes dos mutaciones y una depende de la otra.. las colocas en una funcion y con mutateAsync se ejecuta el onError de la mutacion y manejar los errors y si todo sale bien.. una caguama
  const handleForm = async (formData: CheckPasswordForm) => {
    await checkPasswordMutation.mutateAsync(formData)
    await deleteProjectMutation.mutateAsync(deleteProjectId)
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle transition-all p-12">

                <Dialog.Title
                  as="h3"
                  className="font-semibold text-3xl text-gray-600"
                >Eliminar Proyecto </Dialog.Title>

                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >

                  <div className="flex flex-col gap-2">
                    <label
                      className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                      htmlFor="password"
                    >Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password Inicio de Sesión"
                      className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("password", {
                        required: "El password es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    value='Eliminar Proyecto'
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}