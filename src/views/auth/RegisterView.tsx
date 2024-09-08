import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import Footer from "@/components/footer/Footer";

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center w-96">

        <div className="border-b border-gray-300 pb-4 mb-4">

          {/* header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <h2 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">Crear Cuenta</h2>
            <p className="mt-1 leading-6 text-gray-500">
              Gusto en conocerte, Ingresa tus Datos..!!
            </p>
          </div>

          {/* body */}
          <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              className="space-y-6"
            >
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="pl-1.5 block text-sm font-medium leading-6 text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="jhon@doe.com"
                    className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

              {/* nombre */}
              <div>
                <label className="pl-1.5 block text-sm font-medium leading-6 text-gray-900">Nombre de Usuario</label>
                <div className="mt-1">
                  <input
                    type="name"
                    placeholder="nombre de Usuario"
                    className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("name", {
                      required: "El Nombre de usuario es obligatorio",
                    })}
                  />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  )}
                </div>
              </div>

              {/* password */}
              <div>
                <label className="pl-1.5 block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="crea una contraseña"
                    className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password", {
                      required: "El Password es obligatorio",
                      minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres'
                      }
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                </div>
              </div>

              {/* repetir password */}
              <div>
                <label className="pl-1.5 block text-sm font-medium leading-6 text-gray-900">Repite contraseña</label>
                <div className="mt-1">
                  <input
                    id="password_confirmation"
                    type="password"
                    placeholder="repite tu contraseña"
                    className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password_confirmation", {
                      required: "Repetir Password es obligatorio",
                      validate: value => value === password || 'Los Passwords no son iguales'
                    })}
                  />
                  {errors.password_confirmation && (
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                  )}
                </div>

              </div>
              {/* button */}
              <div>
                <input
                  type="submit"
                  value='Registrarme'
                  className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
              </div>
            </form >

            <p className="mt-12 text-center text-sm text-gray-500">
              Ya tienes cuenta?{' '}
              <Link
                to={'/auth/login'}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Iniciar Sesion
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}







