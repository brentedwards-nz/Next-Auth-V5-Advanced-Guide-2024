import { Button } from "@/components/ui/button"
import { GiPadlock } from "react-icons/gi";

import { cn } from "@/project/lib/utils";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
    ">
    <div className="space-y-6 text-center">
      <div className="flex flex-row space-x-2 justify-center">
        <GiPadlock className="text-6xl font-semibold text-white drop-shadow-md"/>
        <h1 className={
          cn("text-6xl font-semibold text-white drop-shadow-md", font.className)
        }>Auth</h1>
      </div>  
      <p className="text-white text-lg">A simple authentication service</p>
      <div>
        <LoginButton mode="redirect">
          <Button variant="secondary" size="lg">Sign In</Button>
        </LoginButton>
      </div>
    </div>
    </main>
  )  
}
