import { getSession, useSession } from "next-auth/react";
export default function Profile({session}){
    

    console.log(session);

    

    return(
        <>
            <h1>Hola Mundo</h1>
            <h2>{session.user.email}</h2>
        </>
    )
}


export const getServerSideProps = async(req)=>{

    const session = await getSession(req);
    if(!session){
        return {
            redirect:{
                distination: "/login",
                premanent: false
            }
        }
    }

    return {
        props:{
            email: session.email,
            username: session.username
        }
    }
}