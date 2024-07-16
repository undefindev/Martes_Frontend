import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";


const TRANSLATE_AMOUNT = 200

export default function CategoryPills() {

  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return
    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target
      if (container == null) return

      setIsLeftVisible(translate > 0)
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [translate])

  return (
    <div
      className=" overflow-x-hidden relative"
      ref={containerRef}
    >
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        <Button variant='dark' className="py-1 px-3 rounded-lg whitespace-nowrap">All</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">JavaScript</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">TypeScript</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Programing</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Weight Lifting</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Bowling</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Hiking</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">React js</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Next.js</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Functional Programing</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Object Oriented Programing</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Frontend</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Backend and Web Development</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Web Development</Button>
        <Button className="py-1 px-3 rounded-lg whitespace-nowrap">Coding</Button>
      </div>
      {isLeftVisible && (
        <div className=" absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant='ghost'
            size='icon'
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate(translate => {
                const newTranslate = translate - TRANSLATE_AMOUNT
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {/* boton derecho */}
      {isRightVisible && (
        <div className=" absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant='ghost'
            size='icon'
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate(translate => {
                if (containerRef.current == null) {
                  return translate
                }
                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                if (newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}

    </div>
  )
}
