import { supabase } from "../../supabase-client";


export async function getUserDetails(id: string){
    const {data, error} = (await supabase.from("users").select('*').eq("id", id).single());
    if (error){
        console.log(error);
        return []
        
    }

    return data
    
    
}