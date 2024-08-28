import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import Footer from "@/components/footer/Footer";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  /* redireccionando al maldito */
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
      reset()
    },
    onSuccess: () => {
      toast.success('iniciando sesion')
      navigate('/')
      reset() // no estoy seguro si funciona o si es necesario
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        {/* el borde de abajo */}
        <div className="border-b border-gray-300 pb-2 mb-2">

          {/* header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">
              Login
            </h2>
            <p className="mt-1 leading-6 font-light text-gray-500">
              Hola, Identificate..!!
            </p>
          </div>

          {/* body */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleLogin)}
              noValidate
              className="space-y-6"
            >
              {/* email */}
              <div>
                <label htmlFor="email" className="pl-1.5 block text-sm font-medium leading-6 text-gray-700">
                  email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="jhon@doe.net"
                    className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email", {
                      required: "El Email es obligatorio",
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

              {/* password */}
              <div>
                <label htmlFor="password" className="pl-1.5 block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    placeholder="ingresa tu maldito password"
                    className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password", {
                      required: "El Password es obligatorio",
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                  <div className="text-sm text-end mt-1">
                    <Link
                      to={'/auth/forgot-password'}
                      className="pr-1.5 text-indigo-500 hover:text-indigo-400">
                      soy Pendejo..!!
                    </Link>
                  </div>
                </div>
              </div>

              {/* el button */}
              <div>
                <input
                  type="submit"
                  value='Iniciar Sesión'
                  className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Eres Nuevo?{' '}
              <Link to={'/auth/register'} className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
                Registrate
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}


