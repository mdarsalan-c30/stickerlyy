"use client";

import { useState, useEffect } from "react";
import { Trash2, Send, Plus, AlertCircle, Share2, Copy } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";

export default function PackManager() {
  const [packName, setPackName] = useState("My Awesome Pack");
  const [author, setAuthor] = useState("Stickerly User");
  const [stickers, setStickers] = useState<string[]>([]);

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

    const toBase64 = async (src: string) => {
    if (src.startsWith('data:')) return src;
    const res = await fetch(src);
    const blob = await res.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleExportWastickers = async () => {
    if (stickers.length < 3) {
      alert("WhatsApp requires at least 3 stickers in a pack!");
      return;
    }
    
    try {
      const { Capacitor } = await import('@capacitor/core');
      if (Capacitor.isNativePlatform()) {
        const { WhatsAppStickers } = await import('../../lib/whatsapp');
        const base64Stickers = await Promise.all(stickers.map(s => toBase64(s)));
        
        await WhatsAppStickers.addToWhatsApp({
          identifier: "pack_" + Date.now(),
          name: packName || "My Awesome Pack",
          author: author || "Stickerly User",
          trayImage: base64Stickers[0],
          stickers: base64Stickers
        });
        return;
      }
    } catch (e: unknown) {
      alert("Plugin Error: " + (e.message || JSON.stringify(e)));
      console.warn("Plugin failed", e);
    }
    
    try {
      const zip = new JSZip();
      
      // Metadata files
      zip.file("author.txt", author);
      zip.file("title.txt", packName);

      // Add each sticker
      for (let i = 0; i < stickers.length; i++) {
        const url = stickers[i];
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          zip.file("sticker_" + i + ".webp", blob);
        } catch (err) {
          console.error("Failed to fetch sticker", err);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const blobUrl = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = packName.replace(/\s+/g, '_') + ".wastickers";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to generate .wastickers file");
    }
  };

  const shareToWhatsApp = async (url: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], "sticker.gif", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Sticker",
          text: "Check out this sticker from Stickerly!",
        });
      } else {
        // Fallback to whatsapp intent link if Web Share API is unsupported
        window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent("Check out this sticker: " + url), "_blank");
      }
    } catch (error) {
      alert("Sharing failed. Your browser might not support sharing files directly.");
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      
      // Clipboard API expects PNGs typically, but we try
      if (blob.type === "image/png") {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        alert("Copied to clipboard! Paste it in WhatsApp.");
      } else {
        // Fallback for GIFs: Just copy the link or alert
        alert("Due to browser limits, only PNGs can be copied to clipboard. Use the Share button instead!");
      }
    } catch (err) {
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Sticker Pack</h1>
          <p className="text-gray-500">Manage your stickers before exporting</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to delete all saved stickers?")) {
                setStickers([]);
                localStorage.removeItem("sticker_pack");
              }
            }}
            className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition flex items-center gap-2 font-bold shadow-sm"
          >
            <Trash2 className="w-5 h-5" /> Clear All
          </button>
          <button 
            onClick={handleExportWastickers}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center gap-2 font-bold shadow-sm hover:shadow-md"
          >
            <Send className="w-5 h-5" /> {typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform() ? 'Add to WhatsApp' : 'Export .wastickers'}
          </button>
        </div>
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
            <p className="text-sm font-medium">You need at least {3 - stickers.length} more sticker(s) to export a full pack.</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {stickers.map((img, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-square relative group bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
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
              <div className="flex justify-between gap-2">
                <button 
                  onClick={() => shareToWhatsApp(img)}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-700 py-1.5 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button 
                  onClick={() => copyToClipboard(img)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gray-50 text-gray-700 py-1.5 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                >
                  <Copy className="w-4 h-4" /> Copy
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







