"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface CourseEnrollButtonProps {
    courseID: string;
    price: number;
}

const CourseEnrollButton = ({
    courseID,
    price
}: CourseEnrollButtonProps) => {

    const [isloading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseID}/checkout`);
            console.log("response.data.url: ", response.data.url)
            window.location.assign(response.data.url);
            toast.success("smooth operator");
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }

    return ( 
        <Button 
            onClick={onClick}
            disabled={isloading}
            size="sm"
            className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    );
}
 
export default CourseEnrollButton;