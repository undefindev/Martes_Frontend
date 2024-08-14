import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  // invalidamos los queries
  const queryClient = useQueryClient()

  // esta es la maldita mutacion
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  })

  // en si esta es la funcion que hace la magia
  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData })
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className=""
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-semibold">Crear Nota</label>
        <input
          type="text"
          id="content"
          placeholder="Crea la Maldita Nota"
          className="w-full p-2 border border-gray-300 rounded-lg"
          {...register('content', {
            required: 'Escribe algo Vrga.. seas mamon..!!'
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className=" bg-cyan-500 hover:cyan-700 w-full p-2 text-white font-semibold rounded-lg mt-4"
      />
    </form>
  )
}
