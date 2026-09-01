import Link from "next/link";
import { Search, PlusCircle, PackagePlus, Info } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center px-2 pb-safe">
      <Link href="/search" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-green-500 transition active:scale-95">
        <Search className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">Search</span>
      </Link>
      <Link href="/create" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-green-500 transition active:scale-95">
        <PlusCircle className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">Create</span>
      </Link>
      <Link href="/packs" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-green-500 transition active:scale-95">
        <PackagePlus className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">Packs</span>
      </Link>
      <Link href="/about" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-green-500 transition active:scale-95">
        <Info className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">About</span>
      </Link>
    </div>
  );
}
