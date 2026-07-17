import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddProduct()
{ 
     const role = localStorage.getItem("role");

if (role !== "admin") {
    navigate("/");
}


    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    async function handleSubmit(e) {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("image", image);

        await axios.post(
            
            "http://localhost:3000/product",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("New Product Added!");

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
        <h1>Add Products Page</h1> 
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
                   Add
                </button>

        </form>
        </>
    )
}
export default AddProduct;
