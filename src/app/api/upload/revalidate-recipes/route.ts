import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("recipes:all");
  console.log("Recipes revalidated on upload");
  return Response.json({ success: true });
}
