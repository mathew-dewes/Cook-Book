import type { Metadata } from "next";
import '../styles/main.scss';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";








export const metadata: Metadata = {
  title: "Cook Book",
  description: "Share your cooking with the World",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 



{





  return (
    <html lang="en">
      <body>
        <div className="layout">
           <Navbar/>
            <main>

  
        {children}
        </main>
              
        <Footer/>

        </div>
         
       


      </body>
    
    </html>
  );
}
