import { executeAction } from "@/actions/executeAction";
import { auth, signIn } from "@/auth"

import Link from "next/link"
import { redirect } from "next/navigation";

export default async function LoginForm(){

    const session = await auth();
    if (session) redirect('/')
    return (
        <div>
<form action={async (formData: FormData)=>{
            "use server"
            await executeAction({
                actionFn: async()=>{
                    await signIn("credentials", formData)
                }
            })
        }}>
            <label htmlFor="">Email</label>
            <input type="email" required name="email" placeholder="Enter email" />
            <label htmlFor="">Password</label>
            <input type="password" name="password" required placeholder="Enter password" />
            <button type="submit">Login</button>
        </form>
        <p>Dont have an account? Click <Link href={'/register'}><span id="add-link">HERE</span></Link> to Register!</p>
        </div>
        
    )
}