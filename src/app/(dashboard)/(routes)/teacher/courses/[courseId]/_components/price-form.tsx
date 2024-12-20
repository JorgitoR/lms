"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
})

const formatPrince = (price: number) => {

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

const PriceForm = ({initialData, courseId}: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        },
    });
    
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course price update");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return ( 
        <>
        <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
            <div className="font-medium flex items-center justify-between">
                Course price 
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (<>Cancel</>): (<><Pencil className="h-4 w-4 mr-2"/> Edit price</>)}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("test-sm mt-2", !initialData.price && "text-slate-500 italic")}>
                    {initialData.price ? formatPrince(initialData.price) : "No price set"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" step="0.01" disabled={isSubmitting} placeholder="Set a price for your course" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}>

                        </FormField>
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">  
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
        </>
    );
}
 
export default PriceForm;