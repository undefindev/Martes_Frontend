import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from 'react-toastify';

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  /* aqui creamos la mutacion.. ya lo hemos hecho muchas veeces */
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset() /* reseteamos el formulario para que el usuario no salga con sus mamadas */
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


  return (
    <>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="bg-white rounded-2xl md:max-w-96 px-12 p-12"
        noValidate
      >
        <h3 className="text-2xl font-semibold text-gray-600 mb-8">Olvide Contraseña</h3>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pb-0">
            <div className="relative mb-4">
              <input
                id="email"
                type="email"
                placeholder="escribe tu email"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-400"
                {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                htmlFor="email"
              >email</label>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <input
              type="submit"
              value='Enviar Instrucciones'
              className="w-full p-2 rounded-full text-white font-semibold text-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-400"
            />

            <nav className="flex flex-col text-center gap-2">
              <p className="">eres nuevo?..{' '}
                <span>
                  <Link
                    to={'/auth/register'}
                    className="text-center text-cyan-500 text-lg hover:text-indigo-500"
                  >
                    Registrate..!!
                  </Link>
                </span>
              </p>
              <p className="">intentalo de nuevo{' '}
                <span>
                  <Link
                    to={'/auth/login'}
                    className="text-center text-indigo-500 text-lg hover:text-purple-500"
                  >
                    Iniciar Sesion..!!
                  </Link>
                </span>
              </p>
            </nav>
          </div>

        </div>

      </form>


    </>
  )
}
