"use client";
import React, { useEffect, useState } from "react";
import { ConnectWallet, modal } from "@/components/ConnectWallet/ConnectWallet";
import axios from "axios";
import DashboardSkeleton from "@/components/DashboardSkeleton/DashboardSkeleton";
import { weiValue } from "@/constants";
import TransactionCard from "@/components/TransactionCard/TransactionCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setIsConn } from "@/features/isConn/isConnSlice";
import { setSession } from "@/features/session/sessionSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  dispatch(setSession(!!session.data));
  const isConn = useAppSelector((state) => state.isConn);

  if (session.data === null) {
    redirect("/signup");
  }
  const [status, setStatus] = useState(modal.getIsConnected());
  const [isloading, setIsloading] = useState(true);
  const [bal, setBal] = useState<number>(0);
  const [address, setAddress] = useState(`${modal.getAddress()}`);
  const [transactiona, setTransactiona] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    console.log(address);
    console.log(isloading);
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      )
      .then((res) => {
        setBal(res.data.result);
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error);
        setErr(true);
      });

    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      )
      .then((res) => {
        setTransactiona(res.data.result);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setErr(true);
        console.log(error);
      });

    setStatus(modal.getIsConnected());
  }, [address]);

  console.log(transactiona[0]);
  console.log(bal);

  // if (status) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();
    console.log(e.currentTarget[0].value)
    setAddress(e.currentTarget[0].value);
  };

  if (isloading) {
    return (
      <div className="w-full bg-dark-1 text-white flex items-center justify-center h-[80vh] text-3xl">
        Loading...
      </div>
    );
  } else if (err) {
    return (
      <div className="w-full bg-dark-1 text-white flex items-center justify-center h-[80vh] text-3xl">
        Some network issue. Try again later
      </div>
    );
  } else if (!status) {
    return (
      <div className="w-full">
        <div className="mb-10">
          <Skeleton className="w-[80%] md:w-[40%] h-20 mb-2" />
          <Skeleton className="w-[40%] md:w-[10%] h-8" />
        </div>
        <div>
          <Skeleton className="w-[80%] md:w-[40%] h-16 mb-4" />
          <div className="md:flex">
            <Skeleton className="w-full md:w-64 h-64 mr-4 mb-4" />
            <Skeleton className="w-full md:w-64 h-64 mr-4 mb-4 max-sm:hidden" />
            <Skeleton className="w-full md:w-64 h-64 mr-4 mb-4 max-sm:hidden" />
            <Skeleton className="w-full md:w-64 h-64 mr-4 mb-4 max-sm:hidden" />
          </div>
        </div>
        <div className="absolute top-0 left-0 opacity-85 h-screen w-full flex items-center justify-center bg-black z-10"></div>
        <div className="absolute top-0 left-0 h-screen w-full flex items-center justify-center z-20">
          <div className="shadow-primary shadow-white text-white opacity-100 bg-black p-10 rounded-xl z-50">
            <div className="mb-4">Connect your wallet</div>
            <button
              onClick={() => {
                console.log("hellp");
                redirect("/market");
              }}
            >
              <ConnectWallet />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <div className="mb-10">
          <div className="w-full text-white text-3xl md:text-5xl">
            {bal / weiValue} ETH
          </div>
          <div className="text-white text-md md:text-lg font-thin">Balance</div>
        </div>
        <div>
          <div className="text-white text-2xl md:text-4xl mb-6">
            Account Transactions
          </div>
          <div className="flex w-full items-center space-x-2 mb-8">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex w-full items-center space-x-2 mb-8"
            >
              <Input
                type="text"
                placeholder="Enter the account address to search some other acount "
              />
              <Button type="submit">Find</Button>
            </form>
          </div>
          <div>
            {transactiona.length > 0 ? (
              <Carousel>
                <CarouselContent className="w-[80vw]">
                  <CarouselItem>
                    <motion.div
                      animate={{
                        x: ["-100%", "0%", "-100%"],
                        transition: {
                          ease: "linear",
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "loop",
                        },
                      }}
                      className="flex items-center justify-between gap-[30px]"
                    >
                      {transactiona.map((transItem, index) => (
                        <TransactionCard
                          key={index}
                          senderId={transItem.from as string}
                          receiverId={transItem.to as string}
                          amount={transItem.value as string}
                          hash={transItem.hash as string}
                          timestamp={transItem.timeStamp as string}
                          status={transItem.isError as string}
                        />
                      ))}
                    </motion.div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="w-full text-xl md:text-3xl text-white flex justify-center">
                No transactions
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  // }
};

export default Page;
