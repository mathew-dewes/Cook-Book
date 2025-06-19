"use client";
import { useRouter } from "next/navigation";



export default function ProfileImage({ user }: { user: { id: string; name: string; image_url: string; updated_at: string } }) {

  const router = useRouter()




  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    

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
        
          router.refresh();
        console.log("Updated image:", data.imageUrl);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }



  };

  return (
    <div className="image-uploader">
 <label >
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  
     
  
  );
}
