import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>
  register: UseFormRegister<TaskFormData>
}

export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      <div>
        <label
          className="pl-1.5 block text-sm font-medium leading-6 text-gray-500"
          htmlFor="name"
        >Nombre de la tarea</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de la tarea"
          className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div>
        <label
          className="pl-1.5 block text-sm font-medium leading-6 text-gray-500"
          htmlFor="description"
        >Descripción de la tarea</label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="block w-full rounded-lg border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("description", {
            required: "La descripción de la tarea es obligatoria"
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}