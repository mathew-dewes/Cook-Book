import { NextResponse } from "next/server";
import { supabase } from "../../../../../supabase-client";


export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file || !userId) {
    return NextResponse.json({ error: "Missing image file or userId" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filePath = `recipes/${userId}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("recipe-images")
    .upload(filePath, file, { upsert: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${filePath}`;

  return NextResponse.json({ success: true, imageUrl: `${publicUrl}?v=${Date.now()}` });
}
