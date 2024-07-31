import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from '@/types/index';


type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7 pb-0">
            <div className='relative'>
              <input
                id="projectName"
                className="bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                type="text"
                placeholder="Nombre del Proyecto"
                {...register("projectName", {
                  required: "El Titulo del Proyecto es obligatorio",
                })}
              />

              <label
                htmlFor="projectName"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Nombre del Proyecto
              </label>

              {errors.projectName && (
                <ErrorMessage>{errors.projectName.message}</ErrorMessage>
              )}
            </div>

            {/* nombre del cliente */}
            <div className='relative'>
              <input
                id="clientName"
                className="bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                type="text"
                placeholder="Nombre del Cliente"
                {...register("clientName", {
                  required: "El Nombre del Cliente es obligatorio",
                })}
              />

              <label htmlFor="clientName" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Nombre Cliente
              </label>

              {errors.clientName && (
                <ErrorMessage>{errors.clientName.message}</ErrorMessage>
              )}
            </div>

            <div className='relative'>
              <textarea
                id="description"
                className=" bg-transparent peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-400"
                placeholder="Descripción del Proyecto"
                {...register("description", {
                  required: "Una descripción del proyecto es obligatoria"
                })}
              />

              <label
                htmlFor="description"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Descripción
              </label>

              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}