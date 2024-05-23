import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { weiValue } from '@/constants';


const TransactionCard = ({senderId, receiverId, amount, hash, timestamp, status}:any) => {
  return (
    <Dialog>
      <DialogTrigger className='z-0'>
        <div className="rounded-xl p-4 md:p-8 w-64 md:w-80 bg-yellow-1 text-black">
          <div>
            <div className="font-bold md:text-2xl text-lg flex">Sender</div>
            <div className="flex md:text-lg text-sm">
              {senderId.substring(0,20)}
              ....
            </div>
          </div>
          <div>
            <div className="font-bold md:text-2xl text-lg flex">Receiver</div>
            <div className="flex md:text-lg text-sm">
              {receiverId.substring(0,20)}
              ....
            </div>
          </div>
          <div>
            <div className="font-bold md:text-2xl text-lg flex">Amount</div>
            <div className="flex md:text-lg text-sm items-center">
              {amount/weiValue} <img src="/ethereum.svg" className="w-6 h-6 mx-1" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='mx-auto w-[90vw] md:w-full'>
        <DialogHeader className='w-[80vw]'>
          <DialogTitle className='text-xl md:text-3xl font-black -ml-1'>Transaction details</DialogTitle>
          <DialogDescription className='-ml-4 md:ml-0'>
              <div>
                <div className="font-bold md:text-2xl text-lg flex">Sender</div>
                <div className="flex md:text-lg text-xs">
                  {senderId}
                </div>
              </div>
              <div>
                <div className="font-bold md:text-2xl text-lg flex">
                  Receiver
                </div>
                <div className="flex md:text-lg text-xs">
                  {receiverId}
                </div>
              </div>
              <div>
                <div className="font-bold md:text-2xl text-lg flex">Amount</div>
                <div className="flex md:text-lg text-xs items-center">
                  {amount/weiValue} <img src="/ethereum.svg" className="w-4 h-4 mx-1" />
                </div>
              </div>
              <div className='md:w-[30vw] truncate'>
                <div className="font-bold md:text-2xl text-lg flex">Transaction Hash</div>
                <div className="flex md:text-lg text-xs items-center">
                  {hash}
                </div>
              </div>
              <div>
                <div className="font-bold md:text-2xl text-lg flex">
                  Time Stamp
                </div>
                <div className="flex md:text-lg text-xs items-center">
                  {timestamp}
                </div>
              </div>
              <div>
                <div className="font-bold md:text-2xl text-lg flex">Status</div>
                <div className="flex md:text-lg text-xs items-center">
                  {status==="1"?"Success":"Failed"}
                </div>
              </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionCard