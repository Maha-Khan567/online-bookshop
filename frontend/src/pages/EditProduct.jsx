import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function EditProduct ()
{const role = localStorage.getItem("role");
const navigate = useNavigate();
useEffect(() => {
    if (role !== "admin") {
        navigate("/");
    }
}, [role, navigate]);
const { id } = useParams();

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const [image, setImage] = useState(null);
useEffect(() => {
    fetchProduct();
}, [id]);

    async function fetchProduct() {
    try {
        
         
        const response = await axios.get(
    `http://localhost:3000/product/${id}`
);

setTitle(response.data.title);
setDescription(response.data.description);
setPrice(response.data.price);
setStock(response.data.stock);

        
        
    } catch (error) {
        
        alert(error.response?.data || "Something went wrong");
    }
    }
async function handleSubmit(e) {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        if (image) {
    formData.append("image", image);
}

        await axios.put(
            
            `http://localhost:3000/product/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Product Edited!");

        setTitle("");
        setDescription("");
        setPrice("");
        setStock("");
        setImage(null);

        navigate("/adminProducts");

    } catch (error) {

        alert(error.response?.data || "Something went wrong");
    }

}







return(
     <>  
        <h1>Edit Product Page</h1> 
        <form onSubmit={handleSubmit}>
        <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />
<input
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />
<input
                    type="text"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />
<input
                    type="text"
                    placeholder="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <br /><br />
<input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <br /><br />
              <button type="submit">
                   Update
                </button>

        </form>
        </>
    )

}
export default EditProduct;