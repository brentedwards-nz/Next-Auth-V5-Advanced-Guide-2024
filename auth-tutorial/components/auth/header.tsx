import { Poppins } from "next/font/google";
import { GiPadlock } from "react-icons/gi";

import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

interface HeaderProps {
  label: string
}

export const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex flex-row space-x-2 justify-center">
      <GiPadlock className="text-3xl font-semibold text-black"/>
      <h1 className={
        cn("text-3xl font-semibold", font.className)
      }>Auth</h1>
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
  </div>
  )
}