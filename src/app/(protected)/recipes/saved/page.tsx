


import { auth } from "@/auth";
import SaveRecipeCard from "@/components/SavedRecipeCard";

import { getSavedRecipes } from "@/db/saveRecipes";
import Link from "next/link";

// import { SavedRecipe } from "@/db/types";

// Add types to getSaveReipe to fix ts issues
// Add unique constraints for using save 2 of the same recipes. Handle on both front and back end


export default async function RecipesPage(){
    const session = await auth();
    const userId = session?.user?.id as string;
    
    
    const recipes = await getSavedRecipes(userId) as any;
    const noRecipes = recipes.length === 0


    


       


return (
    
        <div className="saved-recipes">
               
            <h1>{noRecipes ? "You have no saved recipes": "Saved Recipes"}</h1>
            {noRecipes && <p>Go save some recipes and come back here to see them</p>}
            {noRecipes && <p style={{marginTop: "5px"}}>Click <Link href={"/"}><span id="add-link">HERE</span></Link> to navigate to the Discover page</p>}
       

            <div className="recipe-cards">
                
                {recipes.map((recipe)=>{
                    const ratings = recipe.recipes.comments?.map((r: { rating: number }) => r.rating) || [];
  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc: number, r: number) => acc + r, 0) / ratings.length).toFixed(1)
      : "0.0";
                  
                    
   return(
<SaveRecipeCard 
            key={recipe.recipes.id}
            title={recipe.recipes.title}
            description={recipe.recipes.description}
            username={recipe.recipes.users.name}
            thumbnail={recipe.recipes.users.image_url}
            recipeImage={recipe.recipes.image_url}
            likeCount={recipe.recipes.likes.length}
            commentCount={recipe.recipes.comments.length}
            recipeId={recipe.recipes.id}
            userId={userId}
            averageRating={averageRating}
            />
   )                 

                
})}
                    
                  </div>

        </div>
    )
}

