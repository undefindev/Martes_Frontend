import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"

export default function NewPasswordView() {
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <p>Ingresa el Codigo</p>

      {!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
    </>
  )
}
