import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from '@/api/ProjectAPI'

export default function CreateProjectView() {

  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({ // hicimos destructuring y eliminamos el mutation
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/') // y regresamelo a la pagina principal
    }
  })

  const handleForm = (formData: ProjectFormData) => mutate(formData) // una sola linea en el arrowFunction no ocupa las llaves
  return (
    <>
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl">Crear Proyecto</h2>
        <nav className="mt-4">
          <Link
            to='/'
            className="px-8 py-2 border border-slate-900 rounded-lg font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
            Home
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="mt-8 shadow-lg p-8 rounded-lg border"
          noValidate
        >

          <ProjectForm
            register={register} // estas son las props
            errors={errors}

          />

          <input
            type="submit"
            value="Crear Proyecto"
            className="w-full uppercase p-2 font-semibold cursor-pointer transition-colors border border-slate-900 rounded-lg hover:bg-slate-900 hover:text-white"
          />
        </form>
      </div>
    </>
  )
}
