import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMemo } from "react"
import { LuTrash2 } from "react-icons/lu"

type NoteDetailProps = { // esto es como cuando destructuramos las props en react normalmente.. aahhh ya entendi. por fin pendejo..!!
  note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {

  const { data, isLoading } = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

  if (isLoading) return 'Cargando..'

  return (
    <div className="p-2 flex items-center justify-between">
      <div>
        <p>{note.content} Por: <span>{note.createdBy.name}</span></p>
        <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button type="button" className="text-red-400 hover:text-red-500 cursor-pointer transition-colors"><LuTrash2 /></button>
      )}
    </div>
  )
}
