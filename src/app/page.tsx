'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation'

export default function Home() {
  const session = useSession();
  console.log(session)
  
  if(session.data === null){
    redirect("/signup")
  } else {
    redirect("/market")
  }
    
  
  
}
