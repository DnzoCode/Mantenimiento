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
      {console.log(session)}
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
  const {email, username} = session.user;



  return(
    <div>
      <h3 className="text-3xl font-bold">Autorized User HomePage</h3>

      <div>
        <h5>{username}</h5>
        <p>{email}</p>
      </div>
        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-bg-gray-50">Sign Out</button>
        </div>
        <div className="flex justify-center">
          <Link href={'/profile'} className="mt-5 px-10 py-1 bg-indigo-500 text-gray-50">Profile</Link>
        </div>
      
    </div>
  )
}

export const getServerSideProps= async(context)=>{
  const session = await getSession(context);

  if(!session){
    return {
      redirect:{
        destination: '/login',
        premanent: false
      }
    }
  }
  return {
    props:{ session }
  }
}