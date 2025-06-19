"use server";


import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "../../supabase-client";
; // your server-side Supabase client

export async function updateUserImage(userId: string, file: File) {
  console.log('Pies');
  


  const extension = file.name.split(".").pop();
  const filePath = `${userId}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("user-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Failed to upload" };
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-images/${filePath}`;
  const { error: updateError } = await supabase
    .from("users")
    .update({
      image_url: publicUrl,
      updated_at: new Date().toISOString(), // important for busting `?v=`
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Update error:", updateError);
    return { error: "Failed to update user record" };
  }
console.log("Revalidating recipes for user:", userId);
  revalidateTag("recipes:all");
  revalidatePath("recipes")

  return { success: true, imageUrl: `${publicUrl}?v=${Date.now()}` };
}
