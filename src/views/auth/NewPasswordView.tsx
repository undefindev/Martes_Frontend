import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <p>Ingresa el Codigo</p>

      {!isValidToken ?
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
        <NewPasswordForm />}
    </>
  )
}
