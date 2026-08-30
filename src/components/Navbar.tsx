import Link from "next/link";
import { Smile, Search, PlusCircle, PackagePlus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Smile className="h-6 w-6 text-green-500" />
            <span className="font-bold sm:inline-block">Stickerly</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/search" className="flex flex-col items-center p-2 text-gray-700 hover:text-green-500 transition">
              <Search className="w-5 h-5" />
              <span className="text-[10px] font-medium">Search</span>
            </Link>
            <Link href="/create" className="flex flex-col items-center p-2 text-gray-700 hover:text-green-500 transition">
              <PlusCircle className="w-5 h-5" />
              <span className="text-[10px] font-medium">Create</span>
            </Link>
            <Link href="/packs" className="flex flex-col items-center p-2 text-gray-700 hover:text-green-500 transition">
              <PackagePlus className="w-5 h-5" />
              <span className="text-[10px] font-medium">Packs</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
