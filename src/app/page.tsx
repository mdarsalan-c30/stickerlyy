import Link from "next/link";
import { Search, Image as ImageIcon, Download, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16 px-4 bg-white rounded-3xl shadow-sm border border-gray-100 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Create WhatsApp Stickers <span className="text-green-500">Instantly</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          Search for trending GIFs, upload your own images, remove backgrounds, and build custom sticker packs to share with friends.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/search" className="w-full sm:w-auto bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Find Stickers
          </Link>
          <Link href="/create" className="w-full sm:w-auto bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow border hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <ImageIcon className="w-5 h-5" /> Create Your Own
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">Search Anything</h3>
          <p className="text-gray-500">Find the perfect reaction from our massive library of GIFs and memes.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">Magic Cutout</h3>
          <p className="text-gray-500">Upload an image and we automatically remove the background for a perfect sticker.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">Export to WhatsApp</h3>
          <p className="text-gray-500">Create packs of 3-30 stickers and export them directly to your WhatsApp app.</p>
        </div>
      </section>
    </div>
  );
}
