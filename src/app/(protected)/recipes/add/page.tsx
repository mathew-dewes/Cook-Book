import { auth } from "@/auth";
import AddRecipeForm from "@/components/_addRecipeForm";


export default async function Page(){
    const session = await auth();

    
    const userId = session?.user?.id as string
    return(
        <div className="add">
            <h1>Add Recipe</h1>
            <AddRecipeForm userId={userId}/>
        </div>
    )
}