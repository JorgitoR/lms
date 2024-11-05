import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";
import SearchInput from "@/components/search";
import CourseList from "@/components/course-list";
import { getCourses } from "@/actions/get-courses";

interface SearchPageProps {
    searchParamas: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ({searchParamas}: SearchPageProps) => {

    const { userId } = auth();
    
    if(!userId){
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId,
        ...searchParamas,
    })

    return ( 
        <>
        <div className="px-6 pt-6 md:hidden md:mb-o block">
            <SearchInput />
        </div>
        <div className="p-6 space-y-4">
            <Categories items={categories}/>
            <CourseList items={courses}/>
        </div>
        </>
     );
}
export default SearchPage;
