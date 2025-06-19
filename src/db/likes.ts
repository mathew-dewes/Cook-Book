import { revalidatePath } from "next/cache";
import { supabase } from "../../supabase-client";






export async function likeRecipe({ userId, recipeId, liked }: { userId: string; recipeId: string, liked: boolean }) {

  if (liked) {
    const { data: existing } = await supabase.from('likes').select("id").eq("user_id", userId).eq("recipe_id", recipeId).single();
    if (!existing) {
      await supabase.from('likes').insert({ recipe_id: recipeId, user_id: userId })
    }


  }
  else {
    await supabase
      .from('likes')
      .delete()
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
  }
  revalidatePath(`/recipes/${recipeId}`)
  revalidatePath(`/`)
  return { success: true }






}

export async function updateLikeStatus(recipeId: string, user_id: string, like: boolean){
  
if (like){
  const {error} = await supabase.from("likes").insert({user_id, recipeId});
  if (error){
    console.log(error);
    return
    
  }
}
}
