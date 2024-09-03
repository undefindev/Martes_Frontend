import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
  data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })


  // invalidar los queries
  const queryClient = useQueryClient()

  // aqui hacemos a mutacion
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div>

          {/* top */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h4 className="mt-4 text-2xl font-semibold leading-9 tracking-tight text-gray-700">
              Mi Perfil
            </h4>
            <p className="mt-1 leading-6 text-gray-500">
              Aquí puedes actualizar tu información
            </p>
          </div>

          {/* body */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(handleEditProfile)}
              className="space-y-6"
              noValidate
            >
              <div>
                <label
                  className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                  htmlFor="name"
                >Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu Nombre"
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("name", {
                    required: "Nombre de usuario es obligatoro",
                  })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
                  htmlFor="password"
                >E-mail</label>
                <input
                  id="text"
                  type="email"
                  placeholder="Tu Email"
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    required: "EL e-mail es obligatorio",
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
              <div>
                <input
                  type="submit"
                  value='Guardar Cambios'
                  className="flex w-full justify-center rounded-md bg-fuchsia-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}