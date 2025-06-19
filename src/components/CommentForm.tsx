
"use client";
import { addCommentAction } from "@/actions/addCommentAction";
import { useActionState } from "react";


const initialState = {
  message: '',
  errors: {},
  pending: false,
};


export default function CommentForm({ recipeId, userId }: { recipeId: string, userId: string }) {
  
const [state, formAction, isPending] = useActionState(addCommentAction, initialState)


  return (
    <form  className="comment-form"
      action={formAction}

    >
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="userId" value={userId} />

      <div>
        <p>Rating:</p>
        <div className="comment-form__rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input required name="rating" type="radio" value={num} defaultChecked={num === 5}  />
              {num} Star
            </label>
          ))}
        </div>
      </div>

      <div className="comment-form__comment-section">
        <p>Comment</p>
        <textarea required name="comment" rows={6} cols={80} />
        <p className="text-red-500 text-sm">{state.errors?.comment?.join(", ")}</p>
      </div>
      <button disabled={isPending}> {!isPending ? "Post Review" : "Posting"}</button>
    </form>
  );
}
