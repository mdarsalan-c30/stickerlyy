import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const searchSlug = encodeURIComponent(query.trim().replace(/\s+/g, '-').toLowerCase()) + "-gifs";
    const tenorUrl = "https://tenor.com/search/" + searchSlug;

    const response = await fetch(tenorUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch from Tenor");
    }

    const html = await response.text();
    
    // Extract direct media.tenor.com gif links
    const regex = /https:\/\/media\.tenor\.com\/[^\/]+\/[^\.]+\.gif/g;
    const matches = html.match(regex) || [];
    
    // Deduplicate and limit to top 12 results
    const uniqueUrls = Array.from(new Set(matches)).slice(0, 12);

    return NextResponse.json({ urls: uniqueUrls });
  } catch (error: any) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
