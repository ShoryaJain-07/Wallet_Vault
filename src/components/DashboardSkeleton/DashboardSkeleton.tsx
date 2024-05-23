import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectWallet, modal } from "@/components/ConnectWallet/ConnectWallet";
import { redirect } from "next/navigation";


const DashboardSkeleton = () => {

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
          <button onClick={() => redirect("/market")}>
            <ConnectWallet />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
