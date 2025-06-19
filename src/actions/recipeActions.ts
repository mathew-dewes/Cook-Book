"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "../../supabase-client";

import { addRecipe } from "@/db/recipes";


export async function addRecipeAction(prevState: unknown, formData: FormData){
  await addRecipe(formData);
  revalidateTag('recipes:all');
}


export async function deleteSavedRecipe(recipe_id: number, userId: number) {
  const { data, error } = await supabase
    .from("recipes").select("saves").eq("id", recipe_id).single();

  if (error) {
    console.log("Error fetching recipe:", error.message);
    return false;
  }

  const originalSaves: number[] = data.saves || [];


const updatedSaves = originalSaves.filter((id) => id !== Number(userId));


  const { error: updateError } = await supabase
    .from("recipes")
    .update({ saves: updatedSaves })
    .eq("id", recipe_id);

  if (updateError) {
    console.log("Error updating saved recipe:", updateError.message);
    return false;
  }


  revalidatePath('/recipes/saved');



  return true;
}



