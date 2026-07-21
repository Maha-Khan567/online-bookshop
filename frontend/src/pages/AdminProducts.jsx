import { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminProducts()
{  
 const navigate= useNavigate();
 const role = localStorage.getItem("role");
if (role !== "admin") {
    navigate("/");
}
   
    async function fetchProducts()
    {try{
        const response = await axios.get(  "http://localhost:3000/product"  );
            setBooks(response.data);}
            catch (error) {
        
        alert(error.response?.data || "Something went wrong");
    }
    }
    
        const [books, setBooks] = useState([]);
        
        useEffect(() => {
           fetchProducts();
        
        }, []);
    

    async function deleteProduct(productId)
   {
     try {
        
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    
        });

        alert("Product removed!");
        fetchProducts();
        
    } catch (error) {
        
        alert(error.response?.data || "Something went wrong");
    }
   }
   async function addProduct()
   {
    navigate("/AddProduct");
   }

   async function editProduct(productId)
   {navigate(`/EditProduct/${productId}`);
   }

     

return(
   
    <>
     <br></br>
      <br></br>
     <button onClick={() =>addProduct()
       
    }>
    Add Product
</button>
    <h1>All Products!</h1>
     <div className="books-container">
         {books.map((book) => (
            <div key={book._id}>
                <img
    src={`http://localhost:3000/uploads/${book.image}`}
    alt={book.title}
    width="150"
/>
        <h3>{book.title}</h3>

<p>{book.description}</p>

<p>Price: Rs. {book.price}</p>

<p>Stock: {book.stock}</p>

<button onClick={() =>deleteProduct(book._id)}>
    Delete Product
</button>
<br></br><br></br>
<button onClick={() => editProduct(book._id)}>
    Edit Product
</button>
<br></br>
<br></br>
</div>

))}
     
   
    
    </div>
    </>
)
}
export default AdminProducts;