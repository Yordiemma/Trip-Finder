import {  NavLink } from "react-router-dom";
import { House, Compass, Heart, User } from "lucide-react";
 
function ButtomNav() {
    return(
        <nav className="bottom-nav">
            <NavLink to="/" className="nav-item">
                <House size={20} />
                <span>Home</span>

            </NavLink>

             <NavLink to="/explore" className="nav-item">
                <Compass size={20} />
                <span>Explore</span>

            </NavLink> 
            
             <NavLink to="/favorites" className="nav-item">
                <Heart size={20} />
                <span>Favorites</span>

            </NavLink> 
            
             <NavLink to="/profile" className="nav-item">
                <User size={20} />
                <span>Profile</span>

            </NavLink>  
     </nav>   
    )
}

export default ButtomNav;