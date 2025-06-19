

import { getRecipeComments, removeComment } from "@/db/comments";
import { StarRating } from "./StarRating";



export default async function CommentSection({recipeId, userId}:{recipeId: string, userId: string}){
    const comments = await getRecipeComments(recipeId);

    


    


    if (comments.length === 0) return <p>No comments</p>
    
    return (
  
        <div className="recipe-page__comments">
            <h3>Reviews:</h3>
        
            {comments.map((comment)=>(
                <div key={comment.id}>
<div className="recipe-page__comment">
                    <div>
                        <div className="comment-rating">
   <p><b>{comment.users.name}</b></p>
   <div>
   <StarRating rating={comment.rating.toFixed(1)}/>
   </div>

                        </div>

                <p className="recipe-page__review-text">{comment.content}</p>
                <p>Posted: {new Date(comment.created_at).toLocaleDateString("en-GB")}</p>
          
                    </div>
                    <div>
 {userId === comment.user_id && 
                 <form action={(async()=>{
                    "use server"
                    await removeComment(comment.id, comment.recipe_id)
                })}>
                
                               <button id="deleteButton">Delete</button>
                 
                  

                
                              
                </form>}
                    </div>
             
               
               

        
            </div>

                          <hr />
                </div>
           
                
            ))}
    
      
        </div>
    )
}