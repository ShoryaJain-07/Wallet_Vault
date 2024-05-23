'use client'
import { signIn, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import React from 'react'

const Page = () => {
    const session = useSession();

    if(session.data){
        redirect('/market')
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-black from-0% via-slate-800 via-50% to-black">
      <div className="w-76 md:w-96 rounded-xl text-white p-2 bg-[#101010] shadow-primary shadow-white">
        <div className="w-full font-sans text-2xl md:text-3xl text-center font-bold">
          Welcome to WalletVault!
        </div>
        <div className="mt-4 text-sm p-4 md:text-lg text-center">
          To access your transaction details{" "}
          <button onClick={() => signIn()} className="text-teal-500 font-bold">
            signup
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page