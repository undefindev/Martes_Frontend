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
      <div className="mx-auto container w-96">
        <div className="flex flex-1 flex-col justify-center">
          <div className="border-b border-gray-300 pb-4 mb-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
              <h5 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">Crear Proyecto</h5>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={handleSubmit(handleForm)}
                noValidate
              >
                <ProjectForm
                  register={register}
                  errors={errors}
                />
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Link to='/' className="text-sm font-semibold leading-6 hover:text-purple-500">
                    Cancelar
                  </Link>
                  <input
                    type="submit"
                    value='Crear Proyecto'
                    className="rounded-md bg-cyan-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}