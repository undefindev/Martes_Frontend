
export default function AddNoteForm() {
  return (
    <form
      onSubmit={() => { }}
      className="space-y-2"
      noValidate
    >
      <div>
        <label htmlFor="content" className="font-semibold">Crear Nota</label>
        <input type="text" id="content" placeholder="Crea la Maldita Nota" className="w-full p-2 border border-gray-400" />
      </div>

      <input type="submit" value="Crear Nota" className=" bg-cyan-500 hover:cyan-700 w-full p-2 text-white font-semibold" />

    </form>
  )
}
