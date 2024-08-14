import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"

type NoteDetailProps = { // esto es como cuando destructuramos las props en react normalmente.. aahhh ya entendi. por fin pendejo..!!
  note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {
  return (
    <div className="p-2 flex place-items-baseline  justify-between">
      <p>
        {note.content}
      </p>
      <div className="flex items-baseline gap-2">
        <p className="text-xs text-gray-500">{formatDate(note.createdAt)}{' '}Por:{' '}</p>
        <p className="text-sm">{note.createdBy.name}</p>
      </div>
    </div>
  )
}
