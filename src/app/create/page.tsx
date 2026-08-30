"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Upload, Wand2, Crop, Download, PackagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CreatePageContent() {
  const searchParams = useSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const imageUrl = searchParams.get('image');
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [searchParams]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagicCutout = async () => {
    if (!image) return;
    setProcessing(true);
    
    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to remove background");
      }

      setImage(data.resultImage);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleAddToPack = () => {
    if (!image) return;
    const saved = localStorage.getItem("sticker_pack");
    const currentPack = saved ? JSON.parse(saved) : [];
    currentPack.push(image);
    localStorage.setItem("sticker_pack", JSON.stringify(currentPack));
    window.location.href = "/packs";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sticker Studio</h1>
          <p className="text-gray-500">Upload an image to create your sticker.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/search" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            Find image instead
          </Link>
          <button 
            onClick={handleAddToPack}
            disabled={!image}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 font-medium disabled:opacity-50"
          >
            <PackagePlus className="w-5 h-5" /> Add to Pack
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[60vh] flex flex-col md:flex-row">
        {/* Sidebar Tools */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 p-3 rounded-xl hover:bg-gray-50 transition shadow-sm"
          >
            <Upload className="w-5 h-5" /> Upload Image
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />

          <hr className="border-gray-200 my-2" />
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Edit Tools</h3>
          
          <button 
            disabled={!image || processing}
            onClick={handleMagicCutout}
            className="w-full flex items-center justify-start gap-3 bg-purple-50 text-purple-700 p-3 rounded-xl hover:bg-purple-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            <span className="font-medium">{processing ? "Removing..." : "Magic Cutout"}</span>
          </button>

          <button 
            disabled={!image}
            className="w-full flex items-center justify-start gap-3 bg-white border border-gray-200 text-gray-700 p-3 rounded-xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Crop className="w-5 h-5" />
            <span className="font-medium">Crop & Resize</span>
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 relative flex items-center justify-center p-8">
          {/* Transparency grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          {image ? (
            <div className="relative shadow-2xl rounded-lg overflow-hidden bg-white max-w-full max-h-full flex items-center justify-center border-4 border-dashed border-gray-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={image} 
                alt="Workspace" 
                className="object-contain max-h-[500px]"
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 z-10">
              <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Upload an image to start creating</p>
              <p className="text-sm mt-2">Supports JPG, PNG, and WebP (up to 512x512)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="animate-spin text-green-500 w-8 h-8" /></div>}>
      <CreatePageContent />
    </Suspense>
  );
}

