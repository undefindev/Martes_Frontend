import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types/index";

export default function EditProjectForm() {

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleForm = () => {

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
            className="w-full uppercase p-2 font-semibold cursor-pointer transition-colors border border-slate-900 rounded-lg hover:bg-slate-900 hover:text-white"
          />
        </form>
      </div>
    </>
  )
}
