import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-neutral-100 shadow-lg rounded-2xl md:max-w-96 p-12 mx-4 md:mx-0"
        noValidate
      >
        <h3 className="text-2xl font-semibold text-neutral-500 mb-8">Crear Cuenta</h3>
        <div className="divide-y divide-indigo-400">
          <div className="py-8 text-base leading-6 space-y-4 text-neutral-700 sm:text-lg sm:leading-7 pb-0">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="doe@email.com"
                className="bg-neutral-100 peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              <label className="absolute left-0 -top-3.5 text-neutral-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm">email</label>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div className="relative">
              {/*  <label
            className="text-sm"
          >Nombre</label> */}
              <input
                type="name"
                placeholder="nombre de Usuario"
                className="bg-neutral-100 peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("name", {
                  required: "El Nombre de usuario es obligatorio",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-neutral-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm">Nombre de Usuario</label>
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="relative">
              {/* <label
            className="text-sm"
          >Password</label> */}

              <input
                type="password"
                placeholder="crea una contraseña"
                className="bg-neutral-100 peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("password", {
                  required: "El Password es obligatorio",
                  minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres'
                  }
                })}
              />
              <label className="absolute left-0 -top-3.5 text-neutral-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm">Contraseña</label>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <div className="relative">
              {/* <label
            className="text-sm"
          >Repetir Password</label> */}

              <input
                id="password_confirmation"
                type="password"
                placeholder="repite tu contraseña"
                className="bg-neutral-100 peer placeholder-transparent h-10 w-full border-b-2 border-neutral-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("password_confirmation", {
                  required: "Repetir Password es obligatorio",
                  validate: value => value === password || 'Los Passwords no son iguales'
                })}
              />
              <label className="absolute left-0 -top-3.5 text-neutral-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm">repite tu contraseña</label>

              {errors.password_confirmation && (
                <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>



        <div className="text-end">
          <Link
            to={'/auth/forgot-password'}
            className="text-sm text-indigo-400 hover:text-purple-500 mt-2"
          >
            olvide contraseña
          </Link>
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="w-full p-2 mt-12 rounded-full text-white font-semibold text-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-400"
        />

        <nav className="mt-8 flex flex-col space-y-4 text-center">
          <p className="text-sm">Ya tienes Cuenta?..{' '}
            <span>
              <Link
                to={'/auth/login'}
                className="text-centet text-fuchsia-500 font-semibold text-lg"
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