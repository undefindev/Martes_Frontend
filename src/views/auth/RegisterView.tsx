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
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* header */}
          <div className="border-b border-gray-300 pb-8" >
            <div>
              <h2 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">Crear Cuenta</h2>
              <p className="mt-1 leading-6 font-light text-gray-500">
                Gusto en conocerte.. ingresa tus datos para registrarte
              </p>
            </div>
            {/* body */}
            <div className="mt-10">
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-4"
                noValidate
              >
                {/* email */}
                <div>
                  <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">email</label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      placeholder="doe@email.com"
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
                <div>
                  <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">Nombre de Usuario</label>
                  <div className="mt-2">
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
                <div>
                  <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                  <div className="mt-2">
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
                <div>
                  <label className="pl-2 block text-sm font-medium leading-6 text-gray-900">repite contraseña</label>
                  <div className="mt-2">
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
              </form >
            </div>
            {/* button */}
            <input
              type="submit"
              value='Registrarme'
              className="w-full py-1.5 mt-4 rounded-lg text-white font-semibold text-xl cursor-pointer bg-cyan-400 hover:bg-indigo-400 hover:text-white"
            />
            {/* mamadas */}
            <nav className="mt-6 flex flex-col gap-1 text-center">
              <p className="mt-10 text-center text-sm text-gray-500">
                Ya tienes cuenta?{' '}
                <Link
                  to={'/auth/login'}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Iniciar Sesion
                </Link>
              </p>
            </nav>
          </div>

          <Footer />
        </div>


      </div>
    </>
  )
}







