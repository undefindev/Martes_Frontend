import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import Footer from "../footer/Footer"

type ProfileFormProps = {
  data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

  const handleEditProfile = (formData: UserProfileForm) => { }

  return (
    <>
      <div className="mx-auto max-w-96 bg-white shadow-lg p-6 rounded-xl border">
        <h4 className="text-xl font-semibold text-neutral-500">Mi Perfil</h4>
        <p className="text-gray-400 mb-8 ml-1">Aquí puedes actualizar tu información</p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-8"
          noValidate
        >
          <div className="mb-4">
            <label
              className="text-xs text-gray-500 font-semibold"
              htmlFor="name"
            >Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-2 text-sm border border-gray-200 rounded-lg"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-4">
            <label
              className="text-xs text-gray-500 font-semibold"
              htmlFor="password"
            >E-mail</label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full p-2 text-sm border border-gray-200 rounded-lg"
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
          <input
            type="submit"
            value='Guardar Cambios'
            className="bg-fuchsia-500 mt-6 mb-4 w-full p-2 text-white font-semibold rounded-lg hover:bg-fuchsia-600 hover:shadow cursor-pointer transition-colors"
          />
        </form>
        <div className="mt-6 text-sm text-gray-400 border-t p-3">
          <Footer />
        </div>
      </div>
    </>
  )
}