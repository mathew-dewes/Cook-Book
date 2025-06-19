'use client'
import { useActionState } from 'react'
import { likeRecipeAction } from '@/actions/likeRecipeAction'

const initialState = {}

export default function LikeButton({
  recipeId,
  userId,
  isLiked,
}: {
  recipeId: string
  userId: string
  isLiked: boolean
}) {
  

  const [, formAction, isPending] = useActionState(
    likeRecipeAction,
    initialState
  )

  return (
    <form action={formAction}>
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="liked" value={(!isLiked).toString()} />

      <button className={isLiked ? 'liked' : ""} type="submit" disabled={isPending}>
        {isPending
          ? 'Updating...'
          : isLiked
          ? 'unlike'
          : 'Like'}
      </button>
    </form>
  )
}
