import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Task['notes']
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <AddNoteForm />
      <div className=" divide-y divide-gray-100 mt-8">
        {notes.length ? (
          <>
            <p className="font-semibold my-4">Notas:</p>
            {notes.map(note => <NoteDetail key={note._id} note={note} />)}
          </>
        ) : <p>No hay Notas</p>}
      </div>

    </>
  )
}
