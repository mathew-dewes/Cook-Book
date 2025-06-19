'use client'
import { useActionState } from 'react'
import { unSaveRecipeAction } from '@/actions/saveRecipeAction'

const initialState = {}

export default function RemoveSaveButton({
  recipeId,
  userId,

}: {
  recipeId: string
  userId: string
}) {
  const [, formAction, isPending] = useActionState(
    unSaveRecipeAction,
    initialState
  )

  return (
    <form action={formAction}>
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="userId" value={userId} />


      <button type="submit" disabled={isPending}>
     {!isPending ? "Remove" : "Removing"}
      </button>
    </form>
  )
}
