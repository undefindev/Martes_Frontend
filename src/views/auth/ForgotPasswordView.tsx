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
        className="bg-white rounded-2xl md:max-w-96 p-12"
        noValidate
      >
        <p className="text-center text-2xl font-semibold text-gray-600 mb-10">Olvide Contraseña</p>
        <div className="flex flex-col mb-4 mt-8">
          <label
            className="text-sm"
            htmlFor="email"
          >email</label>
          <input
            id="email"
            type="email"
            placeholder="escribe tu email"
            className="w-full p-2 border-b text-sm"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="w-full p-2 mt-8 rounded-full text-white font-semibold text-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-400"
        />

        <nav className="flex flex-col text-center mt-8 gap-2">
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
      </form>


    </>
  )
}
