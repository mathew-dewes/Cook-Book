


import { auth } from "@/auth";
import SaveRecipeCard from "@/components/SavedRecipeCard";



import { getSavedRecipes } from "@/db/saveRecipes";
import Link from "next/link";



export default async function RecipesPage(){
    const session = await auth();
    const userId = session?.user?.id as string;

    
    
    const recipes = await getSavedRecipes(userId);
    const noRecipes = recipes.length === 0;

    
    
    

    

    
 
    

    

return (
    
        <div className="saved-recipes">
               
            <h1>{noRecipes ? "You have no saved recipes": "Saved Recipes"}</h1>
            {noRecipes && <p>Go save some recipes and come back here to see them</p>}
            {noRecipes && <p style={{marginTop: "5px"}}>Click <Link href={"/"}><span id="add-link">HERE</span></Link> to navigate to the Discover page</p>}
       

            <div className="recipe-cards">
                
                {recipes.map((recipe)=>{
                      const user = recipe.users?.[0] as { name: string; image_url: string } | undefined;
                    const ratings = recipe.comments?.map((r: { rating: number }) => r.rating) || [];
  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc: number, r: number) => acc + r, 0) / ratings.length).toFixed(1)
      : "0.0";

      console.log("recipe.users", recipe.users);

       // name and image_url
    
      


                  
                    
   return(
<SaveRecipeCard 
           key={recipe.id}
           title={recipe.title}
           description={recipe.description}
           username={user?.name}
           thumbnail={user?.image_url}
           recipeImage={recipe.image_url}
           likeCount={recipe.likes.length}
           commentCount={recipe.comments.length}
           recipeId={recipe.id}
           userId={userId}
           averageRating={averageRating} postDate={""} created_at={""} updated_at={""}            />
   )                 

                
})}
                    
                  </div>

        </div>
    )
}

