import api from "@/lib/axios";
import { Project, dashboardProjectSchema, ProjectFormData } from "@/types/index";
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
    const response = dashboardProjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectById(id: Project['_id']) {
  try {
    const { data } = await api(`/projects/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}