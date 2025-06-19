export type SavedRecipe = {
  id: string;
  user_id: string;
  recipe_id: string;
  like_count: number;
  comment_count: number;
  recipes: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    users: {
      name: string;
      image_url: string;
    };
  };
};

export type Recipe = {
    
    title: string
    description: string
    username: string
    thumbnail: string
    recipeImage: string
    likeCount: number
    commentCount: number
    recipeId: string
    userId: string,
    postDate: string,
    averageRating: number,
    created_at: string,
    updated_at: string
    


}
export type AddCommentArgs = {
  comment: string;
  recipeId: string;
  userId: string;
  rating?: number;
};