import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from 'react-toastify';
import Footer from "@/components/footer/Footer";

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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="border-b border-gray-300 pb-2 mb-2">
          {/* header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">Reestablecer Password</h2>
            <p className="pl-2 leading-6 font-light text-gray-500">
              Todo bien, tu tranquilo y yo nervioso..!!
            </p>
          </div>

          {/* body */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="space-y-6"
              noValidate
            >
              <div>
                <label
                  className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                  htmlFor="email"
                >email</label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="email de Registro"
                    className="pl-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              </div>

              {/* el boton */}
              <div>
                <input
                  type="submit"
                  value='Enviar Instrucciones'
                  className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
              </div>
            </form>
          </div>
          {/* auth tools */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Ya me acorde..{' '}
            <Link to={'/auth/login'} className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
              Iniciar Sesion
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}





