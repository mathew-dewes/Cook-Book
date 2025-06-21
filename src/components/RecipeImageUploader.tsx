"use client";

import { useState } from "react";

export default function RecipeImageUploader({
  userId,
  onUploadComplete,
}: {
  userId: string;
  onUploadComplete: (imageUrl: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    setUploading(true);

    try {
      const res = await fetch("/api/upload/recipe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onUploadComplete(data.imageUrl);
        console.log("Recipe image uploaded ✅", data.imageUrl);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (err) {
      console.error("Error uploading recipe image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="recipe-image-uploader">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <span className="inline-block p-2 bg-blue-500 text-white rounded">
          {uploading ? "Uploading..." : "Upload Recipe Image"}
        </span>
      </label>
    </div>
  );
}
