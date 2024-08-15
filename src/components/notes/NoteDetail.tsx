import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from "react"
import { LuTrash2 } from "react-icons/lu"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = { // esto es como cuando destructuramos las props en react normalmente.. aahhh ya entendi. por fin pendejo..!!
  note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {

  const { data, isLoading } = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data?._id, note.createdBy._id]) // ta raro esto.. 
  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId! // '!' de TypeScript para asegurar que la propiedad projectId de params no es nula ni undefined
  const taskId = queryParams.get('viewTask')!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  })

  if (isLoading) return 'Cargando..'

  return (
    <div className="p-2 flex items-center justify-between">
      <div>
        <p>{note.content} Por: <span>{note.createdBy.name}</span></p>
        <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button
          type="button"
          className="text-red-400 hover:text-red-500 cursor-pointer transition-colors"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}>
          <LuTrash2 />
        </button>
      )}
    </div>
  )
}
