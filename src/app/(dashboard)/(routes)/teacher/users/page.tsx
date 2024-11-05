import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const UserPage = async () => {

    const userData = await db.profile.findMany();
    console.log("user data: ", userData)

    return ( 
        <div className="p-6">
            <h1>Users</h1>
            <DataTable columns={columns} data={userData}/>
        </div>
    );
}
 
export default UserPage;