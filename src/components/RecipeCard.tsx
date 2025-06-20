import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";
import { RecipeProps } from "@/db/helpers/types";




export default function RecipeCard({
    title,
    description,
    username,
    thumbnail,
    recipeImage,
    likeCount,
    commentCount,
    recipeId,
    userId,
    postDate,
    averageRating,
    updated_at

}: RecipeProps) {




    

    return (
        <div className="recipe-card">
            <div className="recipe-card__left">
                <h2>{title}</h2>
                <p className="card-description  recipe-card__desc">{description}</p>
            
            
                <div>
                    
                 
    <div className="recipe-card__user-link">
  <Image className="avatar" src={`${thumbnail}?v=${new Date(updated_at).getTime()}`} height={30} width={30} alt="user-thumbnail"/>
  <Link href={`/recipes/user/${userId}`}><p>By {username}</p></Link>

  
    
                    </div>
                    
                      <StarRating rating={averageRating}/>
                  </div>
                <div className="recipe-card__buttons">
                    <Link href={`/recipes/${recipeId}`}><button>View</button></Link>
            
                   
      
 
                    
                
        
                   
                 

                </div>


            </div>
            <div className="recipe-card__right">
          <Image alt="placeholder" width={100} height={100} src={`${recipeImage}?v=${Date.now()}`} />
          <div className="info">
                <p>Likes: {likeCount}</p>
                <p>Reviews: {commentCount}</p>
                <p>Posted: {postDate}</p>
          </div>
   

                
            </div>
        </div>

    )
}


