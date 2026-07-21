import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Books()
{  
const [books, setBooks] = useState([]);

useEffect(() => {

    async function fetchBooks() {
    const response = await axios.get(  "http://localhost:3000/product"  );
    setBooks(response.data);
    }

    fetchBooks();

}, []);
async function handleAddToCart(productId) {
    try {
        const customerId = localStorage.getItem("customerId");

        await axios.post("http://localhost:3000/cart", {
            customerId,
            productId
        });

        alert("Added to cart!");
    } catch (error) {
        alert(error.response?.data || "Something went wrong");
    }
}
   
    return(
    <>
   
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

<button onClick={() => handleAddToCart(book._id)}>
    Add to Cart
</button>
<br></br>
<br></br>
</div>

))}
 </div>  
 </>
     )
    
}
export default Books;