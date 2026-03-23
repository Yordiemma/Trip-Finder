import { Outlet } from "react-router-dom";
import BottomNav from "../components/ButtonNav";

function MainLayout() {
    return (
        <div>
            <Outlet />
            <BottomNav />
        </div> 
    )
}
export default MainLayout;