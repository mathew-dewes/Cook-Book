import { auth, signOut } from "@/auth";
import Link from "next/link";
import NavLink from "../NavLink";

export default async function Navbar() {
    const session = await auth();

    
    

    
 


    
    

    
    return (
        <nav className="navbar">
            <div className="navbar__left">
           
                     <Link href={"/"}><h1>Cook Book</h1></Link>
                     <div className="hello">
  {session && <p>User: <b>{session.user?.email}</b></p>}
  {session &&  <button onClick={async () => {
                    "use server"
                    await signOut()
                }

                }  id="logout-button" className="show">Logout</button>
}
                                    
                     </div>
                                 
      

        

            </div>



        {session && 
        <div>
<ul className="navbar__links">
           

            
                  <NavLink href={'/recipes/add'}>Add</NavLink>
                  <NavLink href={'/'}>Discover</NavLink>
                  <NavLink href={'/recipes/saved'}>Saved</NavLink>
                  <NavLink href={'/recipes/user'}>My Recipes</NavLink>

    
                  
                <a className="hide" onClick={async () => {
                    "use server"
                    await signOut()
                }

                }>Logout</a>
                                  </ul>
        </div>
        
            
            
        }

            
        </nav>
    )
}