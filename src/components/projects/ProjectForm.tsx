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
      <div className="mb-4 space-y-1">
        <label htmlFor="projectName" className="text-sm font-normal text-gray-500">
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-1  border-gray-300 border rounded-lg"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-4 space-y-1">
        <label htmlFor="clientName" className="text-sm font-normal text-gray-500">
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full p-2  border-gray-300 border rounded-lg"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-4 space-y-1">
        <label htmlFor="description" className="text-sm font-normal text-gray-500">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-2  border-gray-300 border rounded-lg"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria"
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}