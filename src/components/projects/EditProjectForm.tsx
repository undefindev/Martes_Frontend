import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
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
      <div className="max-w-md mx-auto">
        <h2 className="text-4xl">Editar Proyecto</h2>
        <nav className="mt-4">
          <Link
            to='/'
            className="px-8 py-2 border border-slate-900 rounded-lg font-semibold cursor-pointer transition-colors hover:bg-slate-900 hover:text-white" >
            Volver a Proyectos
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
            value="Guardar Cambios"
            className="w-full uppercase p-1 font-semibold cursor-pointer transition-colors border border-slate-900 rounded-lg hover:bg-slate-900 hover:text-white"
          />
        </form>
      </div>
    </>
  )
}
