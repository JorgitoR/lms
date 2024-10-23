"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

const DescriptionForm = ({initialData, courseId}: DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });

    const { isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course title updated");
            toggleEdit();
            router.refresh();
        } catch (error:any) {
            if(error.response){
                toast.error(`Server responded with ${error.response.status} error`)
            }else if(error.request){
                toast.error("No response received from server")
            }else{
                toast.error(`Error: ${error.message}`)
            }
        }
    }


    return ( 
        <div className="mt-6 bg-slate-100 rounded-md p-4 dark:bg-gray-800">
            <div className="font-medium flex items-center justify-between">
                Course Description 
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ): (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit Description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&(
                <div className={cn(
                    "text-sm mt-2", !initialData.description && "text-slate-500 italic"
                )}>
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <p>{initialData.description}</p>
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="description" render={({field}) => (
                            <FormItem>
                            <FormControl>
                                <Textarea disabled={isSubmitting} placeholder="e.g. 'Advanced web development" {...field}>
                                </Textarea>
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
     );
}
 
export default DescriptionForm;