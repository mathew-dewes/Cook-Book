

import { revalidateTag, unstable_cache } from "next/cache";
import {wait } from "./helpers/helps";
import { redirect } from "next/navigation";
import { supabase } from "../../supabase-client";








// GET

export async function getRecipes(query = "", sort: "popular" | "recent" | "az" | "ratings" = "recent"){
  return unstable_cache(
        async()=>{
            wait(1000)
    const {data, error} = await supabase.from('recipes').select(`*, users(name, image_url, updated_at), likes(id), comments(rating)`).ilike('title', `%${query}%`);

    if (error || !data){
      console.error(error);
      return []
    }


    switch(sort){
        case "popular":
      return data.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        break
        case "az":
      return data.sort((a, b) => a.title.localeCompare(b.title));
      break
        case "ratings":
      return data.sort((a, b) => {
       const aRatings = a.comments?.map((comment: { rating: number; }) => comment.rating).filter(Boolean) || [];
  const bRatings = b.comments?.map((comment: { rating: number; }) => comment.rating).filter(Boolean) || [];

  const aAvg = aRatings.length ? aRatings.reduce((sum: number, r: number) => sum + r, 0) / aRatings.length : 0;
  const bAvg = bRatings.length ? bRatings.reduce((sum: number, r: number) => sum + r, 0) / bRatings.length : 0;

  return bAvg - aAvg; 
      });
      break
      case "recent":
        default:
           return data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );   
    }
    
},
           [`recipes-${query}-${sort}`],
    { tags: ["recipes:all"],
        revalidate:10
     }
    )()
}

export async function getRecipe(id: string){
  return unstable_cache(
        async()=>{
            wait(1000)
      const {data, error} = await supabase.from("recipes").select(`*, users(name, image_url, updated_at), likes(*), comments(rating)`).eq("id", id);
    if (error){
        console.log(error);
        return []
        
    }

    return data[0] ?? []

    
},
           [`recipes-${id}`],
    { tags: ["recipes:all"],
        revalidate:10
     }
    )()
}





export async function getUsersRecipes(id: string){
  return unstable_cache(
        async()=>{
            wait(1000)
      const {data, error} = await supabase.from("recipes").select(`*, users(name, image_url, updated_at, bio), likes(*), comments(rating)`).eq("user_id", id);
    if (error){
        console.log(error);
        return []
        
    }

    return data ?? []

    
},
           [`recipes-${id}`],
    { tags: ["recipes:all"],
        revalidate:10
     }
    )()
}





export async function getRecipeIngredients(id: string){
    const {data, error} = await supabase.from("ingredients").select().eq("recipe_id", id);
    if (error){
        console.log(error);
        return []
        }
        return data
}
export async function getRecipeMethods(id: string){
    const {data, error} = await supabase.from("recipe_steps").select().eq("recipe_id", id);
    if (error){
        console.log(error);
        return []
        }
        return data
}

// CREATE

export async function addRecipe(formData: FormData) {
  console.log(formData);
  const title = formData.get('title') as string;
  const description = formData.get("description") as string;
  const user_id = formData.get("userId") as string;
  const methods = JSON.parse(formData.get("methods") as string);
  const ingredients = JSON.parse(formData.get("ingredients")as string);
  const prep_time = Number(formData.get("prep-time"));
  const imageFile = formData.get("image") as File;

  const { data: recipeData , error: insertError } = await supabase.from("recipes").insert({title, description, user_id, prep_time
}).select('id');
if (insertError || !recipeData || recipeData.length === 0) { console.error("Insert error:", insertError); return;
  }

  const newRecipeId = recipeData[0].id;


const {error: ingredientsError} = await supabase.from("ingredients").insert(
  ingredients.map((text: string, i: number)=>({recipe_id: newRecipeId, content: text, position: i
  }))
);


if (ingredientsError){ return {success: false, message: "Error inserting ingredients"}}

// Add Methods
const {error: methodsError} = await supabase.from('recipe_steps').insert(
  methods.map((text: string, i: number)=>({recipe_id: newRecipeId, instruction: text, position: i }))
);

if (methodsError){ return {success: false, message: "Error inserting methods"}
}



const recipeId = recipeData?.[0]?.id;

let image_url: string | null = null;

  if (imageFile.size > 0) {
     image_url = await uploadImage(imageFile, recipeId);

     if (image_url){
      await supabase.from("recipes").update({image_url}).eq("id", recipeId)
     }


   
} 



  revalidateTag('recipes:all');
  redirect('/');
  
}


async function uploadImage(imageFile: File, recipeId: string): Promise<string | null> {
  // Save name of image to the ID of the recipe
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const filePath = `recipes/${recipeId}`

    const {  error } = await supabase.storage
      .from("recipe-images") // 🔁 use your bucket name here
      .upload(filePath, buffer, {
        contentType: imageFile.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error.message);
    } 
      
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${filePath}`;


}


// DELETE
export async function deleteRecipe(id: string){
  console.log(id);
  
    try {
          await supabase.from('recipes').delete().eq('id',id);
          const res = await supabase.storage.from('recipe-images').remove([`recipes/${id}`]);
          console.log(res);
          
    } catch (error) {
        console.log(error);
        
    }
     revalidateTag('recipes:all');
     redirect('/')

}










// UPDATE





