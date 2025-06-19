'use server';

import { z } from 'zod';
import { wait } from '@/db/helpers/helps';
import { addComment } from '@/db/comments';

type CommentFormState = {
  message?: string;
  errors?: {
    comment?: string[];
  };
};


const schema = z.object({
  comment: z.string().min(2, 'Comment must be at least 2 characters long'),
  recipeId: z.string(),
  userId: z.string(),
  rating: z.coerce.number().min(1).max(5)
});

export async function addCommentAction(
  prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  await wait(2000);

  const raw = {
    comment: formData.get('comment')?.toString() || '',
    recipeId: formData.get('recipeId')?.toString() || '',
    userId: formData.get('userId')?.toString() || '',
    rating: Number(formData.get('rating')) || 0,
  };

  const result = schema.safeParse(raw);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Save comment to DB here

  try {
      await addComment(raw);
        return {
    message: 'Comment added!',
    errors: {},
  };
  } catch (error) {
    console.log(error);
    
    return {
      
      errors: { comment: ['Failed to save comment.'] },
    };
  }



}
