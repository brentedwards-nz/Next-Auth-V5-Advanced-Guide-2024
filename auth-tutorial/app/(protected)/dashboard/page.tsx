import { auth, signOut } from "@/project/auth"

import { Button } from "@/components/ui/button"
import { RiDashboard3Line } from "react-icons/ri";
import { GiPadlock } from "react-icons/gi";

import { cn } from "@/project/lib/utils";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const DashboardPage = async () => {
  const session = await auth();
  const role = session?.user.role;
  
  return (
    <main className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
    ">
    <div className="space-y-6 text-center">
      <div className="flex flex-row space-x-2 justify-center">
        <RiDashboard3Line className="text-6xl font-semibold text-white drop-shadow-md"/>
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>Dashboard</h1>
        {/* <p>{JSON.stringify(session)}</p> */}
      </div>
      <h1 className="text-lg text-white drop-shadow-md">Name: {session?.user.name}</h1>
      <h1 className="text-lg text-white drop-shadow-md">Email: {session?.user.email}</h1>  
      <div>
        <form action={async ()=>{
          "use server";
          await signOut();
          }}
        >
        <LoginButton mode="redirect">
          <Button type="submit" variant="secondary" size="lg">Sign Out</Button>
        </LoginButton>
       </form>
      </div>
    </div>
    </main>
  )};


  // return (
    
  //   <div>
  //     <h1>Dashboard Page</h1>
  //     <p>{JSON.stringify(session)}</p>
  //     <p>{role}</p>
  //     <form action={async ()=>{
  //       "use server";
  //       await signOut();
  //     }}>
  //       <button type="submit">Sign Out</button>
  //     </form>
  //     </div>

  // )


export default DashboardPage;