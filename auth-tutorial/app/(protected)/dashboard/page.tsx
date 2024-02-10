import { auth, signOut } from "@/project/auth"

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>{JSON.stringify(session)}</p>
      <form action={async ()=>{
        "use server";
        await signOut();
      }}>
        <button type="submit">Sign Out</button>
      </form>
      </div>

  )
};

export default DashboardPage;