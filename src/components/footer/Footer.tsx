
export default function Footer() {
  return (
    <>
      <footer className='text-sm text-gray-500 text-center font-light flex items-center gap-4'>
        <p>
          Martes.org &copy; - by 'a la Huevona..' &copy;
        </p>
        <p>Todos los Derechos Reservados {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}
