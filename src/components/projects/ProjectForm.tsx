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
        <label
          htmlFor="projectName"
          className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
        >
          Nombre del Proyecto
        </label>
        <div className='mt-1'>
          <input
            id="projectName"
            className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Nombre del Proyecto"
            {...register("projectName", {
              required: "El Titulo del Proyecto es obligatorio",
            })}
          />
        </div>
        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div>
        <label
          htmlFor="clientName"
          className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
        >
          Nombre Cliente
        </label>
        <div className='mt-1'>
          <input
            id="clientName"
            className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Nombre del Cliente"
            {...register("clientName", {
              required: "El Nombre del Cliente es obligatorio",
            })}
          />
        </div>
        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="pl-1.5 block text-sm font-medium leading-6 text-gray-700"
        >
          Descripción
        </label>
        <div className='mt-1'>
          <textarea
            id="description"
            className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Descripción del Proyecto"
            {...register("description", {
              required: "Una descripción del proyecto es obligatoria"
            })}
          />
        </div>
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}