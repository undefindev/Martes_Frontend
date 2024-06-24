import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className=" bg-white rounded-2xl md:max-w-96 px-12 pt-12 pb-6"
        noValidate
      >
        <h3 className="text-2xl font-semibold text-gray-600 mb-8">Login</h3>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pb-0">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="doe@email.com"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("email", {
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">email</label>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="escribe tu contraseña"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("password", {
                  required: "El Password es obligatorio",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contraseña</label>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>

        {/* olvide password */}
        <div className="text-end text-sm text-indigo-400 hover:text-purple-500 mt-2">
          <Link to={'/auth/forgot-password'}>
            olvide contraseña
          </Link>
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="w-full p-2 mt-12 rounded-full text-white font-semibold text-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-400"
        />

        <nav className=" mb-8 mt-2 flex flex-col text-center">
          <p className="mb-1">eres nuevo?..{' '}
            <span>
              <Link
                to={'/auth/register'}
                className="text-center text-purple-500 text-lg hover:text-indigo-500"
              >
                registrate..!!
              </Link>
            </span>
          </p>
        </nav>
        <p className="text-xs text-center text-gray-400">alimentate sanamete, come frutas y verduras ..chingate una caguama..</p>
      </form>
    </>
  )
}


