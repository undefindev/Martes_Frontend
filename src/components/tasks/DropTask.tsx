import { useDroppable } from "@dnd-kit/core" // este es el droppable

type DropTaskProps = {
  status: string
}

export default function DropTask({ status }: DropTaskProps) {

  const { isOver, setNodeRef } = useDroppable({
    id: status
  })
  return (
    <div
      ref={setNodeRef}
      className=" grid place-content-center border border-dashed border-gray-500 rounded mt-4 text-sm text-gray-500 font-light"
    >
      soltar aqui
    </div>
  )
}
