import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebAR from "./mobile-sidebar";

const Navbar = () => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm">
            <MobileSidebAR />
            <NavbarRoutes />
        </div>
     );
}
 
export default Navbar;