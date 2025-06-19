
import { signUp } from "@/actions/signUpAction";
import Form from "next/form";
import { redirect } from "next/navigation";


export default function RegisterForm() {
    
    return (
        <Form action={async (formData: FormData) => {
            'use server'
            
            const result = await signUp(formData);
            if (result) redirect('/register/success')
            

        }}>
            <div className="register__form">
                <div className="input">
                    <div className="bob" >
                        <label htmlFor="">Username</label>
                    </div>
                    <div>
                        <input name="name" required placeholder="Enter username" type="text" />
                    </div>


                </div>
                <div className="input">
                    <div className="bob" >
                        <label htmlFor="">Email</label>
                    </div>
                    <div>
                        <input name="email" required placeholder="Enter Email" type="text" />
                    </div>


                </div>
                <div className="input">
                    <div className="bob" >
                        <label htmlFor="">Password</label>
                    </div>
                    <div>
                        <input name="password" required placeholder="Enter Password" type="password" />
                    </div>


                </div>
                <div className="input">
                    <div className="bob" >
                        <label htmlFor="">Bio (Optional):</label>
                    </div>
                    <div>
                        <textarea rows={8} cols={30} name="bio" id="bio"></textarea>
                    </div>


                </div>
               

            </div>

            <button>Register</button>
   

        </Form>
    )
}