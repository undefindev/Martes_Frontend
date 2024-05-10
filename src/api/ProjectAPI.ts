import api from "@/lib/axios";
import { ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData)
    /* console.log(data) */
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) { // este nos sirve para comprovar que sea un error de axios efectivamente
      throw new Error(error.response.data.error)
    }
  }
}

// yo no se si mañana yo regrese a sus brazos.. solo se que fuen marzo.. cuando la conoci

export async function getProjects() {
  try {
    const { data } = await api('/projects')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) { // este nos sirve para comprovar que sea un error de axios efectivamente
      throw new Error(error.response.data.error)
    }
  }
}