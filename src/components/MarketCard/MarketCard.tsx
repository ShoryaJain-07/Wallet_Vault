import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { weiValue } from "@/constants";

const MarketCard = ({
  name,
  image,
  price,
  change1hr,
  change24hr,
  marketvalue,
}: string) => {
  return (
    <Dialog>
      <DialogTrigger className="m-6">
        <div className="p-4 text-white text-xl border rounded-xl w-52">
          <div className="flex items-center mb-8">
            <img src={image} className="mr-2 w-8" />
            {name}
          </div>
          <div className="flex justify-between">
            <div className="w-1/3">{price}</div>
            <div className="w-1/3 truncate">{change1hr}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="mx-auto w-[90vw] md:w-full">
        <DialogHeader className="w-[80vw]">
          <DialogTitle className="text-xl md:text-3xl font-black -ml-1">
            <div className="flex">
              <img className="flex md:text-lg text-xs w-8 mr-4" src={image} />
              <div className="flex md:text-lg text-xl">{name}</div>
            </div>
          </DialogTitle>
          <DialogDescription className="-ml-4 md:ml-0">
            <div>
              <div className="font-bold md:text-2xl text-lg flex">Price</div>
              <div className="flex md:text-lg text-xs items-center">
                $ {price}
              </div>
            </div>
            <div className="md:w-[30vw] truncate">
              <div className="font-bold md:text-2xl text-lg flex">
                change in 1hr
              </div>
              <div className="flex md:text-lg text-xs items-center">
                {change1hr}
              </div>
            </div>
            <div>
              <div className="font-bold md:text-2xl text-lg flex">
                change in 24hr
              </div>
              <div className="flex md:text-lg text-xs items-center">
                {change24hr}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MarketCard;
