import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";


const SearchPage = async () => {

    const { userId } = auth();
    
    if(!userId){
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return ( 
        <>
        <div className="p-6 space-y-4">
            <Categories items={categories}/>
        </div>
        </>
     );
}
 
export default SearchPage;
