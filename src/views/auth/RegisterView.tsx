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
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">

        <div className="border-b border-gray-300 pb-2 mb-2">

          {/* header */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">Crear Cuenta</h2>
            <p className="mt-1 leading-6 font-light text-gray-500">
              Gusto en conocerte..!!
            </p>
          </div>

          {/* body */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              className="space-y-6"
            >
              {/* email */}
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="pl-1.5 block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="jhon@doe.com"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
              <div className="mt-4">
                <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">Nombre de Usuario</label>
                <div className="mt-1">
                  <input
                    type="name"
                    placeholder="nombre de Usuario"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
              <div className="mt-4">
                <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="crea una contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
              <div className="mt-4">
                <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">Repite contraseña</label>
                <div className="mt-1">
                  <input
                    id="password_confirmation"
                    type="password"
                    placeholder="repite tu contraseña"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
              <div className="mt-4">
                <input
                  type="submit"
                  value='Registrarme'
                  className="w-full py-1.5 mt-4 rounded-lg text-white font-semibold text-xl cursor-pointer bg-cyan-400 hover:bg-indigo-400 hover:text-white"
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







