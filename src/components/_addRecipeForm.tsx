"use client"

import { addRecipeAction } from "@/actions/recipeActions";
import { ChangeEvent, useActionState, useState } from "react"


export default function AddRecipeForm({userId}:{userId: string}) {
    const [ingredientInput, setIngredientInput] = useState<string>("");
    const [methodInput, setMethodInput] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [methods, setMethods] = useState<string[]>([]);
    const [, setRecipeImage] = useState<File | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, formAction, pending] = useActionState(addRecipeAction, null)


    const addIngredient = ()=>{
 if (ingredientInput.trim() !== ""){
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput("")
        }
    }

    const addMethod = () =>{
        if (methodInput.trim() !== ""){
            setMethods([...methods, methodInput.trim()])
            setMethodInput("");
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files.length > 0){
            setRecipeImage(e.target.files[0])
        }
    }
    return (
        <div className="add__form">
       <form action={formAction}>
 <div className="add__input">
                   <p>Name</p>
                    <input required name="title" type="text" placeholder="Recipe name" />
                    <input type="text" name="userId" defaultValue={userId} hidden />
                </div>
                <div className="add__input">
                   <p>Add image - Optional</p>
                    <input name="image"  type="file" placeholder="Recipe Image" onChange={handleFileChange}/>
                </div>
                <div className="add__input">
                    <p>Description:</p>
                    <textarea rows={8} cols={80} name="description" id=""></textarea>
          

                </div>
                <div className="add__input">
                <p>Prep time (Mins)</p>
                    <input name="prep-time" type="number" placeholder="Prep time" />
                </div>
                <div className="add__input">
             <p>Ingredients:</p>
                    <input name="ingredient" value={ingredientInput} onChange={(e)=>setIngredientInput(e.target.value)} type="text" placeholder="Add ingredient" />
                    <button onClick={addIngredient} type="button">Add</button>
                        <input type="hidden" name="ingredients" value={JSON.stringify(ingredients)} />
                
                    <ol>
                        {ingredients.map((item, index)=>(
                            <li key={index}>{item}</li>
                        ))}
                    </ol>

                </div>
                <div className="add__input">
                <p>Methods:</p>
                    <input name="method" value={methodInput} onChange={(e)=>setMethodInput(e.target.value)} type="text" placeholder="Add Method" />
                    <button type="button" onClick={addMethod}>Add</button>
                        <input type="hidden" name="methods" value={JSON.stringify(methods)} />
                    <ol>
              {methods.map((item, index)=>(
                <li key={index}>{item}</li>
              ))}
                    </ol>

                </div>
                    
            <button style={{width: "100px"}} type="submit">{pending ? "Posting" : "Post"}</button>
       </form>
               
     




        </div>
    )
}