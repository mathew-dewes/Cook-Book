import RecipeCard from "@/components/RecipeCard";
import {  getUsersRecipes } from "@/db/recipes";
import { getUserDetails } from "@/db/users";
import Image from "next/image"


export default async function Page({params}:
    {params: Promise<{id: string}>}){
        const {id} = await params;
        const recipes = await getUsersRecipes(id);
        const user = await getUserDetails(id)
        console.log(recipes);
        
  
    return (
         <div className="user-recipe-page">
        <div className="user-recipe-page__profile">
     
          <div className="user-recipe-page__profile-top">
   <Image className="avatar" alt="placeholder" width={200} height={200} src={`${user.image_url}?v=${Date.now()}`} />
  
   
   
 
          </div>
         
 <h2>{user.name}</h2>
 <p><b>Bio:</b> {user.bio}</p>

        </div>
                <p><b>Totals Recipes:</b> {recipes.length}</p>
       
      <div className="recipe-cards">
   {recipes.map((recipe)=>{
   
     const ratings = recipe.comments?.map((r: { rating: number }) => r.rating) || [];
     const averageRating =
       ratings.length > 0
         ? (ratings.reduce((acc: number, r: number) => acc + r, 0) / ratings.length).toFixed(1)
         : "0.0";
   
    
         
     return(
        <RecipeCard 
               key={recipe.id}
               title={recipe.title}
               description={recipe.description}
               username={recipe.users.name}
               thumbnail={recipe.users.image_url}
               recipeImage={recipe.image_url}
               likeCount={recipe.likes.length}
               commentCount={recipe.comments.length}
               recipeId={recipe.id}
               userId={recipe.user_id}
               postDate={new Date(recipe.created_at).toLocaleDateString("en-GB")}
               averageRating={averageRating}
               created_at={recipe.created_at}
               updated_at={recipe.users.updated_at}
               />
     );
              
     })}
      
          </div>

    </div>
    )
}