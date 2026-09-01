import Link from "next/link";
import { Smile } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 active:scale-95 transition">
          <Smile className="h-6 w-6 text-green-500" />
          <span className="font-bold text-lg">Stickerly</span>
        </Link>
        <div className="text-xs text-gray-400 font-medium tracking-wide">
          Made with ❤️ by MD Arsalan
        </div>
      </div>
    </header>
  );
}
