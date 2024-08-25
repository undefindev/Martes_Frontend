import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { LuArrowLeft } from "react-icons/lu";

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
      <div className="w-full max-w-md transform overflow-hidden border rounded-2xl shadow-2xl bg-white text-left align-middle transition-all p-12 mx-auto">

        <div className="flex items-center justify-between gap-4 mb-8">
          <h5 className="font-semibold text-2xl text-gray-500">Editar Proyecto</h5>
          <nav className="border rounded-lg p-2 hover:border-cyan-400">
            <Link
              to='/'
            >
              <LuArrowLeft className="text-cyan-400 h-6 w-6" />
            </Link>
          </nav>
        </div>


        <form
          className=""
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >

          <ProjectForm
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value='Guardar Cambios'
            className="bg-cyan-400 hover:bg-cyan-500 w-full p-2 mt-4  text-white font-semibold text-xl cursor-pointer rounded-xl transition-colors"
          />


        </form>
      </div>
    </>
  )
}
