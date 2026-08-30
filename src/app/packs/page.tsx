"use client";

import { useState, useEffect } from "react";
import { Trash2, Send, Plus, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PackManager() {
  const [packName, setPackName] = useState("My Awesome Pack");
  const [author, setAuthor] = useState("Stickerly User");
  const [stickers, setStickers] = useState<string[]>([]);

  // Load stickers from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sticker_pack");
    if (saved) {
      try {
        setStickers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse pack");
      }
    }
  }, []);

  const savePack = (newStickers: string[]) => {
    setStickers(newStickers);
    localStorage.setItem("sticker_pack", JSON.stringify(newStickers));
  };

  const removeSticker = (index: number) => {
    const updated = [...stickers];
    updated.splice(index, 1);
    savePack(updated);
  };

  const handleAddToWhatsApp = () => {
    if (stickers.length < 3) {
      alert("WhatsApp requires at least 3 stickers in a pack!");
      return;
    }
    alert("In a compiled Android app, this will trigger the native WhatsApp intent! For now on web, this is a placeholder.");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Sticker Pack</h1>
          <p className="text-gray-500">Manage your stickers before exporting to WhatsApp</p>
        </div>
        <button 
          onClick={handleAddToWhatsApp}
          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center gap-2 font-bold shadow-sm hover:shadow-md"
        >
          <Send className="w-5 h-5" /> Add to WhatsApp
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pack Name</label>
            <input 
              type="text" 
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {stickers.length < 3 && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">You need at least {3 - stickers.length} more sticker(s) to add to WhatsApp.</p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {stickers.map((img, i) => (
            <div key={i} className="aspect-square relative group bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={img} alt={"Sticker "} className="w-full h-full object-contain p-2" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                 <button 
                   onClick={() => removeSticker(i)}
                   className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition"
                 >
                   <Trash2 className="w-5 h-5" />
                 </button>
               </div>
            </div>
          ))}

          {/* Add more button */}
          <Link href="/search" className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-500 hover:bg-green-50 transition cursor-pointer">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium">Add More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
