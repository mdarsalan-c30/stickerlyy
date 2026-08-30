import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    // Remove the data URI prefix (e.g., data:image/png;base64,)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "wK3jEM7sSHDB2ogu57aqu95Y",
        "Content-Type": "application/json",
        "Accept": "image/*"
      },
      body: JSON.stringify({
        image_file_b64: base64Data,
        size: "auto",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const resultBase64 = "data:image/png;base64," + buffer.toString("base64");

    return NextResponse.json({ resultImage: resultBase64 });
  } catch (error: any) {
    console.error("Background removal error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
