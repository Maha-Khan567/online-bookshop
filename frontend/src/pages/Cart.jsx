import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cart()

{     const role = localStorage.getItem("role");
if (role !== "customer") {
    navigate("/login");
}
     const navigate= useNavigate();
        async function fetchCart() {
const customerId =localStorage.getItem("customerId");
const response = await axios.get(`http://localhost:3000/cart/${customerId}`);
setCart(response.data);

    }
    async function removeFromCart(productId) {
    try {
        const customerId = localStorage.getItem("customerId");
        
        await axios.delete(`http://localhost:3000/cart/${customerId}/${productId}`, {
        });

        alert("Item removed from cart!");
        fetchCart();
    } catch (error) {
        
        alert(error.response?.data || "Something went wrong");
    }
    }

    async function clearCart( ) {
    try {const customerId =localStorage.getItem("customerId");
        await axios.delete(`http://localhost:3000/cart/${customerId}`, {
        });

        alert("cart cleared!");
        fetchCart();
    } catch (error) {
        
        alert(error.response?.data || "Something went wrong");
    }
    }

async function placeOrder(){
try {const customerId =localStorage.getItem("customerId");
        await axios.post(`http://localhost:3000/order`, {
            customerId
        });

        alert("Order Placed!");
        navigate("/orders");
        
    } catch (error) {     
        alert(error.response?.data || "Something went wrong");
    } 
}
     const [cart, setCart] = useState(null);
    useEffect(() => { 
        fetchCart(); 
                    }, []);

    if (!cart) {
    return <h1>Your Cart is Empty!</h1>;
       }
 return(
 <>
   <h1>Your Cart!</h1>
         {cart.items.map((item) => (<div key={item.productId._id}>

<img
    src={`http://localhost:3000/uploads/${item.productId.image}`}
    alt={item.productId.title}
    width="150"
/>

<h3>{item.productId.title}</h3>

<p>Price: Rs. {item.productId.price}</p>

<p>Quantity: {item.quantity}</p>

<button onClick={() => removeFromCart(item.productId._id)}>
    Remove
</button>


</div>
))}
<br></br>
<p>Total Price: {cart.totalPrice}</p>
<br></br>
<p>Total Items: {cart.totalItems}</p>
<br></br>
<button onClick={() => placeOrder()}>
    Place Order
</button>
<br></br>
 <button onClick={() => clearCart()}>
    Clear Cart
</button>
 </>
     )
   
}
export default Cart;
