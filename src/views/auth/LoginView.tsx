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
      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate
        className="mb-1 p-4 md:p-0"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Login</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Hola.. Ingresa tus datos para el registro
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* email */}
              <div className="col-span-full">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                    <input
                      id="email"
                      type="email"
                      placeholder="jhonh@doe.com"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
              </div>

              {/* password */}
              <div className="col-span-full">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="password"
                      placeholder="ingresa tu password"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      {...register("password", {
                        required: "El Password es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <input
              type="submit"
              value='Iniciar Sesión'
              className="w-full py-1.5 pl-1 mt-12 rounded-lg text-white font-semibold text-xl cursor-pointer bg-cyan-400 hover:bg-cyan-500 hover:text-white"
            />

            <nav className="mt-6 flex flex-col text-center">
              <p className="text-sm text-gray-500">eres nuevo?..{' '}
                <span>
                  <Link
                    to={'/auth/register'}
                    className="text-centet text-gray-700"
                  >
                    registrate..!!
                  </Link>
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-1">soy pendejo..{' '}
                <span>
                  <Link to={'/auth/forgot-password'} className="text-centet text-gray-700">
                    olvide la contraseña
                  </Link>
                </span>
              </p>
            </nav>
          </div>
        </div>
      </form>

      <Footer />


    </>
  )
}


