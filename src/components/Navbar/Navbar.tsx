"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import MobileNav from "@/components/MobileNav/MobileNav";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { ConnectWallet } from "@/components/ConnectWallet/ConnectWallet";
import { setSession } from "@/features/session/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setIsConn } from "@/features/isConn/isConnSlice";
import { redirect } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  dispatch(setSession(!!session.data));

  const handleSignout = () => {
    signOut();
    console.log("hi");
  };


  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 pl-4 pr-4 py-4 lg:px-10 border-b-2 border-gray-700">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/logo.svg"
          width={40}
          height={40}
          alt="logo"
          className="max-sm:size-12"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          <span className="text-teal-1">WALLET</span>VAULT
          <span className="text-teal-1">.</span>
        </p>
      </Link>
      <div className="flex items-center justify-center">
        <button onClick={() => dispatch(setIsConn(true))}>
          <ConnectWallet />
        </button>
      </div>

      <div className="flex justify-between items-center">
        {/* <UserButton /> */}
        {/* clerk - user management */}
        {session.data ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={session?.data?.user?.image!}
                height={32}
                width={48}
                alt="user"
                className="rounded-full md:w-24"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-1 mt-2 text-white rounded-md bg-dark-1">
              <DropdownMenuLabel className="border-b border-gray-1 py-3 px-2">
                {session.data.user?.name}
              </DropdownMenuLabel>
              <DropdownMenuItem className="p-2 text-red-1">
                <button onClick={() => handleSignout()}>sign out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => signIn()}
            className="p-1 border border-white rounded-sm text-white"
          >
            signup
          </button>
        )}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
