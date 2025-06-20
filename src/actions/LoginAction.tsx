// actions/loginUser.ts
"use server";


import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { loginSchema } from "../db/helpers/validation";



type LoginState = {
  error: string | null;
};

export async function loginUser(
  prevState: { error: string | null },
  formData: FormData
): Promise<LoginState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0].message,
    };
  }

   return { error: null }; // ✅ Validation passed, proceed on client


}
