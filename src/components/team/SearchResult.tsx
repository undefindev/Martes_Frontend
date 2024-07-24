import { TeamMember } from "@/types/index"
import Button from '../Button';
import { UserPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

  /* este nada mas por si queremos que modal se cierre despues de agregar al maldito */
  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!


  const queryClient = useQueryClient() // para invalidar las queries

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] }) // este mismo nos sirve para invalidar cuando eliminemos al colaborador
    }
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id
    }

    mutate(data)
  }


  return (
    <>
      <p className="mt-8 text-center font-semibold">Resultados</p>
      <div className="flex items-center justify-between">
        <p>{user.name}</p>
        <Button size='icon' variant='ghost' onClick={handleAddUserToProject}>
          <UserPlus />
        </Button>
      </div>
    </>
  )
}