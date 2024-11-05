import getDashboardCourses from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock, Info, InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { BannerCard } from "./_components/banner-card";
import InfoCard from "./_components/info-card";
import CourseList from "@/components/course-list";



const Dashboard = async () => {

    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const {completedCourses, coursesInProgress} = await getDashboardCourses(userId);

    return ( 
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <BannerCard
                    icon={InfoIcon}
                    label="Welcome to the dashboard"
                    description={`This is where you can see your progress 
                    and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
                    mode. To enroll in a course, enter dummy data in the Stripe form. Contact me from
                    folio.kendev.co to obtain admin access`}
                />
            </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard 
                incon={Clock}
                label="in Progress"
                numberOfItems={coursesInProgress.length}/>
            <InfoCard 
                incon={CheckCircle}
                label="Completed"
                numberOfItems={completedCourses.length}
                variant="success"/>
           </div>
           <CourseList items={[...coursesInProgress, ...completedCourses]}/>
        </div>
    );
}
 
export default Dashboard;