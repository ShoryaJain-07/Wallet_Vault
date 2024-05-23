"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import MarketCard from "@/components/MarketCard/MarketCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/app/hook";
import { setSession } from "@/features/session/sessionSlice";

const page = () => {
const dispatch = useAppDispatch();
const session = useSession();
dispatch(setSession(!!session.data));
  
if (session.data === null) {
    redirect("/signup");
  }
  const [coins, setCoins] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [err, setErr] = useState(false);

  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/markets",
    params: {
      vs_currency: "usd",
      ids: "ethereum",
      category: "layer-1",
      order: "id_asc",
      per_page: "100",
      page: "1",
      sparkline: "false",
      price_change_percentage: "1h",
      locale: "en",
      precision: "4",
    },
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-qZz624WkwNjzx88jrzkt9cGw",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCoins(response.data);
        setIsloading(false);
      })
      .catch(function (error) {
        setIsloading(false);
        setErr(true);
        console.error(error);
      });
  }, []);

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
  } else {
    return (
      <div className="flex flex-col items-center justify-center md:pt-6 text-white">
        <Carousel>
          <CarouselContent className="w-[70vw]">
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
                {coins.map((coin) => (
                  <MarketCard
                    name={coin.name}
                    price={coin.current_price}
                    image={coin.image}
                    change1hr={coin.price_change_percentage_1h_in_currency}
                    change24hr={coin.price_change_percentage_24h}
                  />
                ))}
              </motion.div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="w-full flex flex-wrap justify-center">
          <div></div>
          {coins.map((coin) => (
            <MarketCard
              name={coin.name}
              price={coin.current_price}
              image={coin.image}
              change1hr={coin.price_change_percentage_1h_in_currency}
              change24hr={coin.price_change_percentage_24h}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default page;
