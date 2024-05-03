
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center my-2 bg-red-100 text-red-600 font-semibold p-3 uppercase tx-sm">
      {children}
    </div>
  )
}
