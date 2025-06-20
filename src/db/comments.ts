import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { supabase } from "../../supabase-client";



// GET
export function getRecipeComments(recipeId: string) {
  return unstable_cache(
    async () => {
const { data, error } = await supabase
        .from("comments")
        .select(`*, users(name)`)
        .eq("recipe_id", recipeId)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return [];
      }

      return data;
    },
    [`comments-${recipeId}`],
    { tags: [`comments:${recipeId}`],
  revalidate: 60 }
  )();
};

// CREATE

export async function addComment({comment, recipeId, userId, rating }:{
  comment: string, recipeId: string, userId: string, rating: number
}){  


  if (!comment || !recipeId || !userId) {
    return { success: false, message: "Missing required fields" };
  }

    
  
    const {error} = await supabase.from("comments").insert({
        user_id :userId, 
        content: comment,
        recipe_id: recipeId,
        rating,
        
     
    });

    if (error){
        console.log(error);
        return
        
    }
        revalidateTag(`comments:${recipeId}`);
        revalidatePath('/')
        return {success: true}

    
    
}


// DELETE



export async function removeComment(commentId: string, recipeId: string){
  const response = await supabase.from("comments").delete().eq("id", commentId);
  console.log(response);
       revalidateTag(`comments:${recipeId}`);
        revalidatePath('/')
  
}


