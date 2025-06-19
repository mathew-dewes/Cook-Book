'use server'

import { removeSavedRecipe, saveRecipe } from '@/db/saveRecipes'
import { revalidatePath } from 'next/cache'

export async function saveRecipeAction(
  prevState: unknown,
  formData: FormData
) {
  const recipeId = formData.get('recipeId')?.toString()
  const userId = formData.get('userId')?.toString()
  const saved = formData.get('saved') === 'true'

  if (!recipeId || !userId) return { error: 'Missing data' }
    await saveRecipe({ recipeId, userId, saved }) 

  revalidatePath(`/recipes/${recipeId}`)

  return { success: true }
}


export async function unSaveRecipeAction(
  prevState: unknown,
  formData: FormData
) {
  const recipeId = formData.get('recipeId')?.toString()
  const userId = formData.get('userId')?.toString()

  if (!recipeId || !userId) return { error: 'Missing data' };
    await removeSavedRecipe({ recipeId, userId });

  revalidatePath(`/recipes/${recipeId}`)

  return { success: true }
}
