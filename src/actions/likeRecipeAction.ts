'use server'

import { likeRecipe } from '@/db/likes'
import { revalidatePath } from 'next/cache'

export async function likeRecipeAction(
  prevState: unknown,
  formData: FormData
) {
  const recipeId = formData.get('recipeId')?.toString()
  const userId = formData.get('userId')?.toString()
  const liked = formData.get('liked') === 'true'

  if (!recipeId || !userId) return { error: 'Missing data' }
    await likeRecipe({ recipeId, userId, liked }) // only adds a like if one doesn't exist

  revalidatePath(`/recipes/${recipeId}`)

  return { success: true }
}
