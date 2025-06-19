import { revalidatePath } from "next/cache";
import { supabase } from "../../supabase-client";
import { wait } from "./helpers/helps";








export async function getSavedRecipes(id: string | undefined) {
    const { data, error } = await supabase .from("saved_recipes")

  .select(`recipes(*, users(name, image_url), likes(id), comments(rating))`).eq("user_id", id)
        // let queryBuilder = supabase.from('recipes').select(`*, users(name, image_url), likes(id), comments(id)`);
    if (error) {
        console.log(error);
        return []
    }
    return data
}




export async function saveRecipe({ userId, recipeId, saved }: { userId: string; recipeId: string, saved: boolean }) {

  if (saved) {
    const { data: existing } = await supabase.from('saved_recipes').select("id").eq("user_id", userId).eq("recipe_id", recipeId).single();
    if (!existing) {
      await supabase.from('saved_recipes').insert({ recipe_id: recipeId, user_id: userId })
    }


  }
  else {
    await supabase
      .from('saved_recipes')
      .delete()
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
  }
  revalidatePath(`/recipes/${recipeId}`)
  revalidatePath(`/`)
  return { success: true }






}


export async function removeSavedRecipe({ userId, recipeId }: { userId: string; recipeId: string }) {
  await wait(1000)
await supabase
      .from('saved_recipes')
      .delete()
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
  
  revalidatePath(`/recipes/${recipeId}`)
  revalidatePath(`/`)
  return { success: true }






}

