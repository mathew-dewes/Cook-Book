"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";


export default function ProfileImage({ user }: { user: { id: string; name: string; image_url: string; updated_at: string } }) {
  const [imageUrl, setImageUrl] = useState(user.image_url);
  const [loading, setLoading] = useState(false);
  const router = useRouter()


    useEffect(() => {
    setImageUrl(`${user.image_url}?v=${Date.now()}`);
  }, [user.image_url]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
        const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);

    try {
      console.log("Starting upload fetch...");


      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      console.log("Fetch returned:", res.status);

      const data = await res.json();

      if (res.ok) {
        await fetch("/api/upload/revalidate-recipes", { method: "POST" });
        
        setImageUrl(`${data.imageUrl}?v=${Date.now()}`); // updated with cache-busting `?v=...`
          router.refresh();
        console.log("Updated image:", data.imageUrl);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }

    setLoading(false);


  };

  return (
    <div className="image-uploader">
 <label >
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  
     
  
  );
}
