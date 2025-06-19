import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";





export default function RegisterPage() {

    return (
        <div className="register">
            <h1>Register Page</h1>
<RegisterForm/>
         <p style={{marginTop:"20px"}}>Already have an account? Click <Link href={'/login'}><span id="add-link">HERE</span></Link> to Login</p>

    
        </div>
    )
}