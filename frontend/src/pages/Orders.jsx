import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
function Orders()
{   const role = localStorage.getItem("role");
const navigate = useNavigate();
if (role !== "customer") {
    navigate("/login");
}
const [orders, setOrders] = useState([]);

useEffect(() => {

    async function fetchOrders() {
    const customerId =localStorage.getItem("customerId");
    const response = await axios.get(  `http://localhost:3000/order/${customerId}` );
    setOrders(response.data);
    console.log(response.data);
    }
   
    fetchOrders();

}, []);
  if(orders.length === 0) {
    return <h1>No Orders Yet!</h1>;
                }
  return(
 <>
   <h1>Your Orders!</h1>
{orders.map((order,index) => (
            <div key={order._id}>
            <h2>Order# {index + 1}</h2>   
  
           {order.items.map((item) => (
            
            <div key={item.productId._id}>
 <img
    src={`http://localhost:3000/uploads/${item.productId.image}`}
    alt={item.productId.title}
    width="150"/>
<h3>{item.productId.title}</h3>
<p>{item.productId.description}</p>
<p> Quantity:{item.quantity}</p>
<p>Price: Rs. {item.productId.price}</p>

</div>

))}


<p>Total Price: Rs. {order.totalPrice}</p>
<p>Total Items: {order.totalItems}</p>
<p>Status:{order.status}</p>
<br></br>
<hr></hr>
<br></br>
</div>

))}

 </>
   )
}
export default Orders;