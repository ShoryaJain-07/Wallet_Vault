'use client'
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";


const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <main className="">
        <Navbar />
        <div className="flex">
          <Sidebar />

          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </main>
    </Provider>
  );
};

export default HomeLayout;
