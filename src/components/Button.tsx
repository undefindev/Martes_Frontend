import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

/* esta es la variable con todas las mamadas */
const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary"
      ],
    },
    size: {
      default: [" rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: 'default'
  }
})

/* este es el type mentado */
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

/* y aqui nos llevamos todo */
export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button {...props} className={twMerge(buttonStyles({ variant, size }), className)} />

}
