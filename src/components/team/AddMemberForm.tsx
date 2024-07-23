import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: ''
  }
  const params = useParams()
  const projectId = params.projectId!

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const mutation = useMutation({
    mutationFn: findUserByEmail
  })

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData }
    mutation.mutate(data)
  }

  const resetData = () => {
    reset(),
      mutation.reset()
  }

  return (
    <>

      <form
        className=""
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >

        <h3 className="text-2xl font-semibold text-neutral-500 mb-8">Agregar Colaborador</h3>

        <div className="divide-y divide-gray-100">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pb-0">
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="doe@email.com"
                className="peer placeholder-transparent h-10 w-full border-b-2 text-gray-900 focus:outline-none focus:border-indigo-400"
                {...register("email", {
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              <label
                className="absolute left-0 -top-3.5 text-neutral-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm"
                htmlFor="name"
              >E-mail de Usuario</label>

              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="w-full p-2 mt-12 rounded-xl text-white font-semibold text-xl cursor-pointer bg-purple-400"
          value='Buscar Usuario'
        />
      </form>

      <div className="mt-8">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.error && <p className="text-center">{mutation.error.message}</p>}
        {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
      </div>

    </>
  )
}