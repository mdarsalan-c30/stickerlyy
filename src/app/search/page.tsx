"use client";

import { useState } from "react";
import { Search, Loader2, Plus, Download } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setResults(data.urls || []);
      if (data.urls && data.urls.length === 0) {
        setError("No results found for that query.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Find Stickers & GIFs</h1>
        <p className="text-gray-500 text-center mb-6">Powered by BharatRouter AI with Live Web Search</p>
        
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for funny dogs, movie reactions..."
            className="w-full py-4 pl-12 pr-4 text-lg rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50 transition"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        {/* Trending Categories */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3 text-center">Trending Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Cute Baby Girl", "Cute Baby Boy", "Meme Sticker Indian", "Romantic", "Indirect Flirt"].map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setQuery(cat);
                  // Optionally auto-trigger search here
                }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-600 transition shadow-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-8 bg-red-50 p-4 rounded-xl">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p>Searching the web...</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((url, i) => (
          <div key={i} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="aspect-square relative overflow-hidden bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={url} 
                alt={"Result "} 
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/400x400/eeeeee/666666?text=Broken+Link";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                 <button 
                   onClick={() => window.location.href = `/create?image=${encodeURIComponent(url)}`}
                   className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition" 
                   title="Add to Editor"
                 >
                   <Plus className="w-5 h-5" />
                 </button>
                 <button 
                   onClick={async () => {
                     try {
                       const res = await fetch(url);
                       const blob = await res.blob();
                       const blobUrl = window.URL.createObjectURL(blob);
                       const link = document.createElement('a');
                       link.href = blobUrl;
                       link.download = `sticker_${i}.gif`;
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                     } catch (err) {
                       alert('Failed to download image.');
                     }
                   }}
                   className="bg-green-500 text-white p-2 rounded-full hover:scale-110 transition" 
                   title="Download"
                 >
                   <Download className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
