"use client"

import { supabase } from "../../supabase-client";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function UserSettings({ userId, onUploadComplete }: { userId: string, onUploadComplete?: () => void }) {
  console.log("UserSettings props:", { userId, onUploadComplete });
  const handleUpload = async (file: File) => {
    // Your image upload logic
    const { error } = await supabase.storage
      .from("user-images")
      .upload(`${userId}`, file, { upsert: true });

    if (!error) {
      // update user record in your db
      await supabase
        .from("users")
        .update({ image_url: `${supabaseUrl}/storage/v1/object/public/user-images/${userId}` })
        .eq("id", userId);
        // https://nyuymunyyoqmmmqxsqmr.supabase.co/storage/v1/object/public/user-images/48d25428-a532-477b-abdc-81ee48cca96b

      // ✅ notify parent to refresh
      console.log("Starting upload...");
console.log("Calling onUploadComplete...");
      onUploadComplete?.();
    }
  };

  return (
    <input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
  );
}
