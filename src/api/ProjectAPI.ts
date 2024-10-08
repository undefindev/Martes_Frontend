import api from "@/lib/axios";
import { Project, dashboardProjectSchema, ProjectFormData, editProjectSchema, projectSchema } from "@/types/index";
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
    const response = editProjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// obtener el projecto completo 
export async function getFullProject(id: Project['_id']) {
  try {
    const { data } = await api(`/projects/${id}`)
    const response = projectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData
  projectId: Project['_id']
}

export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const url = `/projects/${id}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}