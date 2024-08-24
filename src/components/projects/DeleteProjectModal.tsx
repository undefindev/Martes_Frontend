import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

export default function DeleteProjectModal() {
  const initialValues = {
    password: ''
  }
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const show = deleteProjectId ? true : false

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleForm = async (formData) => { }


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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle transition-all p-16">

                <Dialog.Title
                  as="h3"
                  className="font-semibold text-3xl text-gray-600"
                >Eliminar Proyecto </Dialog.Title>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >

                  <div className="flex flex-col gap-2">
                    <label
                      className="font-normal text-xl"
                      htmlFor="password"
                    >Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password Inicio de Sesión"
                      className="w-full p-2  border-gray-300 border rounded-xl"
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
                    className=" bg-cyan-500 hover:bg-cyan-600 w-full p-2  text-white font-semibold text-xl cursor-pointer rounded-xl"
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