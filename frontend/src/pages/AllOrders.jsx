import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
function AllOrders()
{   const role = localStorage.getItem("role");
const navigate = useNavigate();
if (role !== "admin") {
    navigate("/");
}
async function fetchAllOrders() {
    const response = await axios.get(  `http://localhost:3000/order` );
    setAllOrders(response.data);
    }


const [allOrders, setAllOrders] = useState([]);
useEffect(() => {

    

    fetchAllOrders();

}, []);

const [selectedStatus, setSelectedStatus] = useState({});

async function updateStatus(orderId, status)
{  try{
    await axios.put( `http://localhost:3000/order/${orderId}`,
        {status}
     );
    
     alert("Order Status Updated!");
     fetchAllOrders();
    }
    catch (error) {
        alert(error.response?.data || "Something went wrong");
    }
}



if(allOrders.length === 0) 
    {
    return <h1>No Orders Yet!</h1>;
    }

  return( <>
   <h1>All Orders!</h1>
{allOrders.map((order,index) => (
            <div key={order._id}>
            <h2>Order# {index + 1}</h2> 
            <h2>Customer Name: {order.customerId.username}</h2>   
  
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
<select
    value={selectedStatus[order._id] || order.status}
    onChange={(e) => setSelectedStatus(
        { ...selectedStatus,[order._id]: e.target.value
        }
                                      )
             }
       >
<option value="Pending">Pending</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>
<option value="Cancelled">Cancelled</option>
     </select>
<button onClick={() => updateStatus(order._id,selectedStatus[order._id] || order.status)}>
    Update Status
</button>
<br></br>
<hr></hr>
<br></br>
</div>

))}






    </>  )
}

export default AllOrders;