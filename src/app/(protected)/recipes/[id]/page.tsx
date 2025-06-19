import { auth } from "@/auth";
import CommentForm from "@/components/CommentForm";
import CommentSection from "@/components/CommentSection";
import { deleteRecipe, getRecipe, getRecipeIngredients, getRecipeMethods } from "@/db/recipes";
import Image from "next/image";
import { Suspense } from "react";
import LikeButton from "./_LikeButton";

import SaveButton from "./_saveButton";
import { StarRating } from "@/components/StarRating";
import { supabase } from "../../../../../supabase-client";


export default async function RecipePage({params}:
    {params: Promise<{id: string }>}
){
    const {id: recipeId} = await params;
    const session = await auth()
    const loggedInUserId = session?.user?.id as string;
    const recipe = await getRecipe(recipeId);
    const ingredients = await getRecipeIngredients(recipeId);
    const methods = await getRecipeMethods(recipeId);

    
    const {title, description, prep_time,  user_id, users, image_url } = recipe;

    const {data: existingLike} = await supabase.from("likes").select('id').eq("recipe_id", recipeId).eq("user_id", loggedInUserId).maybeSingle();
    const {data: existingSave} = await supabase.from("saved_recipes").select('id').eq("recipe_id", recipeId).eq("user_id", loggedInUserId).maybeSingle();
    const isLiked = !!existingLike;
    const isSaved = !!existingSave;



     const ratings = recipe.comments?.map((r: { rating: number }) => r.rating) || [];
const averageRating: number =
  ratings.length > 0
    ? parseFloat((ratings.reduce((acc: number, r: number) => acc + r, 0) / ratings.length).toFixed(1))
    : 0.0;

      


    

    

    return(
        <div className="recipe-page">
            <div className="recipe-page__recipe">
                <div className="recipe-page__recipe-left">
                    <h1>{title}</h1>
            <p>By {users.name}</p>
    
            <Image className="avatar" alt="profile_thumbnail" src={`${users.image_url}?v=${new Date().getTime()}`} height={60} width={60}></Image>
                 <Image className="hide" alt="profile_thumbnail" src={image_url} height={100} width={100}></Image>
             
      
        <p className="recipe-page__description">{description}</p>
        <div className="recipe-page__prep-ratings">
       <p>Prep time: {prep_time | 0 } mins</p>
        <StarRating rating={averageRating.toFixed(1)}/>
        </div>
 
       
        <hr />
        <div className="recipe-page__buttons">
                  <LikeButton recipeId={recipe.id} userId={loggedInUserId} isLiked={isLiked}/>
                  <SaveButton recipeId={recipe.id} userId={loggedInUserId} isSaved={isSaved}/>
         
  

            {user_id == loggedInUserId && 
             <button onClick={async()=>{
                "use server"
                await deleteRecipe(recipeId);
            }}>Delete</button> }
           
        </div>
        <div className="likes-and-comments" style={{display: "flex", gap:"20px"}}>
 <p>Likes: {recipe.likes.length}</p>
        <p>Comments: {recipe.comments.length}</p>
        </div>
       
                </div>
                 <Image id="recipeImage" alt="profile_thumbnail" src={image_url} height={400} width={400}></Image>
            </div>
            <hr />
            <div className="recipe-page__instructions">
                <div className="recipe-page__instructions-left">
                    <p>Ingredients:</p>
                    <ul>
                        {ingredients.map((item, index: number)=>(
                            <li key={index}>{item.content}</li>
                        ))}
                        
                    </ul>
                </div>
                <div className="recipe-page__instructions-right">
                    <p>Method:</p>
                    <ol>
                        {methods.map((item, index: number)=>(
                            <li key={index}>{item.instruction}</li>
                        ))}
                    
                    </ol>
                </div>
            </div>
            <hr />
            <div className="recipe-page__comment-section">
                <h3>Add a review:</h3>
                <CommentForm recipeId={recipeId} userId={loggedInUserId}/>
            </div>
            <hr />
       
                <Suspense fallback={<p>Loading comments...</p>}>
       <CommentSection recipeId={recipe.id} userId={loggedInUserId}/>
                </Suspense>
         
          
        
        </div>
    )
    
}