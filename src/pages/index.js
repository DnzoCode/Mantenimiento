import Link from "next/link";
import { useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react"

export default function Home() {

  const {data: session} = useSession();

  const handleSignOut = () =>{
    signOut()
  }

   
  return (
    <div>
      {session ? User({session, handleSignOut}): Guest()}
    </div>
  )
  
}


//Guest
function Guest(){
  return(
    <div>
      <h3 className="text-3xl font-bold">Guest HomePage</h3>
        
        <div className="flex justify-center">
          <Link href={'/login'} className="mt-5 px-10 py-1 bg-indigo-500 text-gray-50">Iniciar Sesion</Link>
        </div>
      
    </div>
  )
}

//Authorize user

function User({session, handleSignOut}){
  return(
    <div>
      <h3 className="text-3xl font-bold">Autorized User HomePage</h3>

      <div>
        <h5>{session.user.email}</h5>
      </div>
        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">Sign Out</button>
        </div>
        <div className="flex justify-center">
          <Link href={'/login'} className="mt-5 px-10 py-1 bg-indigo-500 text-gray-50">Profile</Link>
        </div>
      
    </div>
  )
}

export const getServerSideProps= async({ req })=>{
  const session = await getSession({ req });

  if(!session){
    return {
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props:{ session }
  }
}