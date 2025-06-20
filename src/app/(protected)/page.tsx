
import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "@/db/recipes";

import Form from "next/form";


import { Suspense } from "react";

export default async function Page({ searchParams }:
  { searchParams: Promise<{ query?: string; sort?: string | number } >}){

  const params = await searchParams;
const query = params.query ?? "";
const sort = (params.sort ?? "recent") as "popular" | "recent" | "az" | "ratings";


const recipes = await getRecipes(query, sort);

  

  

  return (
    <div className="discover">
       <div className="discover__filters">
        <h3>Filter by:</h3>
        <div className="discover__filter-buttons">
          <a href={`?query=${query}&sort=recent`}><button className={sort === "recent" ? "filter-active": ""}>Most Recent</button></a>
          <a href={`?query=${query}&sort=popular`}><button className={sort === "popular" ? "filter-active": ""}>Most Popular</button></a>
          <a href={`?query=${query}&sort=ratings`}><button className={sort === "ratings" ? "filter-active": ""}>Highest Rated</button></a>
          <a href={`?query=${query}&sort=az`}><button className={sort === "az" ? "filter-active": ""}>A-Z</button></a>
    
   </div>

        <Form action="">
          <div className="discover__search-form" >
 <label htmlFor="">Search:</label>
          <input id="query" name="query" type="search" defaultValue={query} />
            <button>Search</button>
          </div>
         
          
        </Form>
      </div>

        <div className="recipe-cards">
          <Suspense fallback={<p>Loading....</p>}>
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
          </Suspense>
         

        </div>
      

    </div>
  )
}