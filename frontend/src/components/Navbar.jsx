import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
function Navbar()
{   const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    localStorage.removeItem("role");
    navigate("/login");
}

    if (token) 

    return(
        <nav>
           <div className="nav"  >
        <Link className="button" to="/">Home</Link> 
        
        {role === "customer" && (
            <>
        <Link className="button" to="/Books">books</Link> 
        <Link  className="button" to="/cart">Cart</Link> 
        <Link  className="button" to="/orders">Orders</Link>
        </>
        )}
        
        {role==="admin"&&(
            <>
        <Link  className="button" to="/allOrders">AllOrders</Link>
        <Link  className="button" to="/addProduct">AddProduct</Link>  
        <Link  className="button" to="/adminProducts">AllProducts</Link> 
        
        </>
        )}
        </div>
         <div className="logout">
        { token&&   (
        <button onClick={handleLogout}>Logout</button>
        )}
       </div>
        </nav>
        
          ) 
else
    return(
        <nav>
        <Link className="button"  to="/">Home</Link> 
        <Link  className="button" to="/login">Login</Link>
        <Link className="button" to="/register">Register</Link>
        </nav>
         )
}
export default Navbar;