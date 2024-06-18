import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')

  // la mentada mutacion
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => { setToken(token) }

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token })


  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="bg-white space-y-8 p-8 mt-8 rounded-xl ring-1 ring-black/5 backdrop-blur-3xl"
      >
        <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
        <div className="flex justify-center gap-4">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-2 rounded-lg border border-slate-300 placeholder-white text-center" />
          </PinInput>
        </div>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to='/auth/request-code'
            className="text-center font-normal rounded-md border py-2"
          >
            Solicitar un nuevo Código
          </Link>
        </nav>

      </form>



    </>
  )
}