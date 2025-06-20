import { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
};



export type RecipeProps = {
    title: string,
    description: string,
    username: string,
    thumbnail: string,
    recipeImage: string,
    likeCount: string,
    commentCount: string,
    recipeId: string,
    userId: string,
    postDate: string,
    averageRating: string,
    updated_at: string
    created_at: string
}


export type SavedRecipeProps = {
    title: string,
    description: string,
    username: string | undefined,
    thumbnail: string | undefined,
    recipeImage: string,
    likeCount: number,
    commentCount: number,
    recipeId: string,
    userId: string,
    postDate: string,
    averageRating: string,
    updated_at: string
    created_at: string
}

export type SavedRecipe = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  prep_time: number;
  comments: { rating: number }[];
  users: { name: string; image_url: string }[]; // ✅ NOT an array
  likes: { id: string }[];
};