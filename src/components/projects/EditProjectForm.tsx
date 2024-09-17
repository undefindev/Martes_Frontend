import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
  /* console.log(data) */

  const navigate = useNavigate() // los parentecis hdtpm.. si no como saba la funcion que la estas llamando
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description
    }
  })
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)

  }
  return (
    <>
      <div className="mx-auto container w-96">
        <div className="flex flex-1 flex-col justify-center">
          <div className="border-b border-gray-300 pb-4 mb-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
              <h5 className="mt-10 text-2xl font-semibold leading-9 tracking-tight text-gray-700">
                Editar Proyecto
              </h5>
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
                  <Link
                    to='/'
                    className="text-sm font-semibold leading-6 hover:text-purple-500"
                  >
                    Cancelar
                  </Link>

                  <input
                    type="submit"
                    value='Guardar Cambios'
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

/* 
  <nav className="border rounded-lg p-2 hover:border-cyan-400">
                  
                </nav>
*/
