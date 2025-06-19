import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase-client";
import { revalidateTag } from "next/cache";


export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  const ext = file.name.split(".").pop();
  const filePath = `${userId}.${ext}`;

  const { error } = await supabase.storage
    .from("user-images")
    .upload(filePath, file, { upsert: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-images/${filePath}`;
  await supabase
    .from("users")
    .update({
      image_url: publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

      revalidateTag("recipes:all");
  console.log("Revalidated tag ✅");
  

  return NextResponse.json({ success: true, imageUrl: `${publicUrl}?v=${Date.now()}` });
}
