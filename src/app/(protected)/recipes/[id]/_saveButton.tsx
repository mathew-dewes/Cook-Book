'use client'
import { useActionState } from 'react'
import { saveRecipeAction } from '@/actions/saveRecipeAction'

const initialState = {}

export default function SaveButton({
  recipeId,
  userId,
  isSaved,
}: {
  recipeId: string
  userId: string
  isSaved: boolean
}) {
  const [, formAction, isPending] = useActionState(
    saveRecipeAction,
    initialState
  )

  return (
    <form action={formAction}>
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="saved" value={(!isSaved).toString()} />

      <button className={isSaved ? 'liked' : ""} type="submit" disabled={isPending}>
        {isPending
          ? 'Saving...'
          : isSaved
          ? 'Unsave'
          : 'Save'}
      </button>
    </form>
  )
}
