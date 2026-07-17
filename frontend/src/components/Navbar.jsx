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
        <Link to="/">Home</Link> |{" "} 
        
        {role === "customer" && (
            <>
        <Link to="/Books">books</Link> |{" "} 
        <Link to="/cart">Cart</Link> |{" "} 
        <Link to="/orders">Orders</Link> |{" "} 
        </>
        )}
        
        {role==="admin"&&(
            <>
        <Link to="/allOrders">AllOrders</Link> |{" "} 
        <Link to="/addProduct">AddProduct</Link> |{" "} 
        <Link to="/adminProducts">AdminProducts</Link> |{" "} 
        <Link to="/editProduct">EditProduct</Link> |{" "}
        
        </>
        )}
        { token&&   (
        <button onClick={handleLogout}>Logout</button>
        )}
        </nav>
        
          ) 
else
    return(
        <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
        </nav>
         )
}
export default Navbar;