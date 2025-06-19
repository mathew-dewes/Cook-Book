export type SavedRecipe = {
  recipes: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    prep_time: number;
    likes: {id: number}[];
    comments: { rating: number }[];
    users: {
      name: string;
      image_url: string;
    },
  }[]; // 👈 recipes is an array now
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
    averageRating: string,
    created_at: string,
    updated_at: string
    


}
export type AddCommentArgs = {
  comment: string;
  recipeId: string;
  userId: string;
  rating?: number;
};







export type Comment = {
  rating: number;
  // Add more if needed
};

export type User = {
  name: string;
  image_url: string;
};

export type BobRecipe = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  prep_time: number;
  likes: { id: number }[];
  comments: Comment[];
  users: User;
};
