import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from '@/api/ProjectAPI'
import { LuCornerUpLeft } from "react-icons/lu"

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
      <div className="relative p-4 md:flex flex-col justify-between w-96 overflow-hidden rounded-2xl bg-white bg-clip-border text-gray-700 border mx-auto items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-600">Nuevo Proyecto</h2>
        </div>

        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className='mx-auto'
        >

          <ProjectForm
            register={register} // estas son las props
            errors={errors}

          />

          <nav className="flex items-center gap-4 mt-8">
            <input
              type="submit"
              value="Crear Proyecto"
              className="w-full p-2 rounded-md border cursor-pointer"
            />
            <Link
              to='/'
              className="border rounded-md p-2" >
              <LuCornerUpLeft className="w-6 h-6" />
            </Link>
          </nav>


        </form>
      </div>
    </>



  )
}

{/* 
  este es el original del projecto
  <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

        <nav className="my-5 ">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a Proyectos</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >

          <ProjectForm
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value='Crear Proyecto'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  */}