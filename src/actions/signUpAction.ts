
import bcrypt from "bcryptjs";
import { supabase } from "../../supabase-client";
import { executeAction } from "../actions/executeAction";




const signUp = async (formData: FormData) => {
    const saltRounds = 10;
    return executeAction({
        actionFn: async () => {
            const name = formData.get("name")?.toString()
            const email = formData.get('email')?.toString();
            const password = formData.get('password')?.toString();
            const bio = formData.get("bio")?.toString()
            if (!name || !email || !password) { throw new Error("Missing required fields"); }
            const existingEmail = await checkEmail(email);

            if (existingEmail){
                throw new Error("Email already exists")
            } 

      

            const hashedPassword = await bcrypt.hash(password, saltRounds);
             const { data, error } = await supabase
        .from("users")
        .insert([{ name, email, bio, password: hashedPassword }]);

        if (error) throw error
     
            
            
               
      
        return data
        
            







          
        }
    })
}

export { signUp }


async function checkEmail(email: FormDataEntryValue) {
    try {
        const { data, error } = await supabase
            .from('users').select('email').eq('email', email)
        if (error) throw error;
        if (data && data.length > 0) {
            return true
        }
        return false
    } catch (error) {
        console.log(error);


    }
}



