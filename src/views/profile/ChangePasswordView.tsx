
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })

  const password = watch('password');

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto flex flex-1 flex-col justify-center">

        <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="font-semibold text-2xl leading-9 tracking-tight mt-10 text-gray-700">Cambiar Password</h1>
          <p className="text-gray-500 mt-1 leading-6">Utiliza este formulario para cambiar tu password
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                htmlFor="current_password"
              >Password Actual</label>
              <div className="mt-1">
                <input
                  id="current_password"
                  type="password"
                  placeholder="Password Actual"
                  className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("current_password", {
                    required: "El password actual es obligatorio",
                  })}
                />
              </div>
              {errors.current_password && (
                <ErrorMessage>{errors.current_password.message}</ErrorMessage>
              )}
            </div>

            <div>
              <label
                className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                htmlFor="password"
              >Nuevo Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  placeholder="Nuevo Password"
                  className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password", {
                    required: "El Nuevo Password es obligatorio",
                    minLength: {
                      value: 8,
                      message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
              >Repetir Password</label>
              <div className="mt-1">
                <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Repetir Password"
                  className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password_confirmation", {
                    required: "Este campo es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                  })}
                />
              </div>
              {errors.password_confirmation && (
                <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
              )}
            </div>
            <input
              type="submit"
              value='Cambiar Password'
              className="flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </form>
        </div>
      </div>
    </>
  )
}