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
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className='bg-gray-50 rounded-2xl mx-auto md:max-w-96 px-12 pt-12 pb-6'
      >

        <div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-8">Nuevo Proyecto</h2>
        </div>

        <ProjectForm
          register={register} // estas son las props
          errors={errors}

        />

        <nav className="mt-4 flex items-center justify-between gap-2">
          <input
            type="submit"
            value="Crear Proyecto"
            className="w-full p-2 mt-12 rounded-xl text-white font-semibold text-xl cursor-pointer bg-indigo-400"
          />
          <Link
            to='/'
            className="p-2 mt-12 rounded-full text-white font-semibold text-xl cursor-pointer bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-400" >
            Home
          </Link>
        </nav>


      </form>
    </>
  )
}
