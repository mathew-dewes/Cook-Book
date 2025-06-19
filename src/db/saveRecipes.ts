import { revalidatePath } from "next/cache";
import { supabase } from "../../supabase-client";
import { wait } from "./helpers/helps";
import { BobRecipe } from "./helpers/types";









export async function getSavedRecipes(id: string): Promise<BobRecipe[]> {
    const { data, error } = await supabase .from("saved_recipes")

  .select(`
      recipes (
        id,
        title,
        description,
        image_url,
        created_at,
        prep_time,
        comments(rating),
        users (
          name,
          image_url
        ),
        likes(id)
      )
    `).eq("user_id", id)
    if (error) {
        console.log(error);
        return []
    }
    

    return data?.map((item) => item.recipes) ?? []
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

