import { supabase } from "../../../supabase-client";

export function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars


