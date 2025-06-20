

import { auth } from "@/auth";
import ProfileImage from "@/components/ProfileImage";
import RecipeCard from "@/components/RecipeCard";


import { getUsersRecipes } from "@/db/recipes";
import { getUserDetails } from "@/db/users";
import Image from "next/image";
import Link from "next/link";


export default async function Page() {


  const session = await auth()
  const id = session?.user?.id as string;
  const recipes = await getUsersRecipes(id);
  const user = await getUserDetails(id);

  
  
  

  

  

  
return (
    <div className="user-recipe-page">
        <div className="user-recipe-page__profile">
          <div className="user-recipe-page__profile-top">
        <Image className="avatar" alt="Profile-image" src={`${user.image_url}?v=${new Date().getTime()}`} height={200} width={200}></Image>
 
            <ProfileImage user={user}/>
 
 

          </div>
         
 <h2>{user.name}</h2>
 <p className="user-bio"><b>Bio:</b> {user.bio}</p>
 
   
        </div>
        <h2 style={{marginBottom: "10px"}}>{recipes.length <= 0 ? "You have no recipes" : "My Recipes" }</h2>
        <p>Click <Link href={'/recipes/add'}><span id="add-link">HERE</span></Link> to upload your recipes and share with your friends.</p>

       
      <div className="user-recipe-page__recipe-cards recipe-cards">

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
              updated_at={recipe.users.updated_at} created_at={""}                    />
          );
                   
          })}
     
      

      </div>

    </div>
  )
}