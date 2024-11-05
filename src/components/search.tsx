"use client";
import {useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {

    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);
    
    const searchparamas = new URLSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const currentCategoryId = searchparamas.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                title: debouncedValue,
                categoryId: currentCategoryId,
            }
        }, {skipNull: true, skipEmptyString: true});
        
        router.push(url);

    }, [debouncedValue, currentCategoryId, router, pathName]);

    return ( 
        <>
        <div className="relative">
            <Search className="h-4 w-4 top-3 absolute left-3 text-slate-600 dark:text-slate-200"/>
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 focus-visible:ring-slate-200"
                placeholder="Search for courses"
            />
        </div>
        </>
     );
}
 
export default SearchInput;