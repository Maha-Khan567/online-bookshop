import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AllOrders from "./pages/AllOrders";
import AddProduct from "./pages/AddProduct";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";



function App() {
    return (
       <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<Books />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/allOrders" element={<AllOrders />} />
      <Route path="/addProduct" element={< AddProduct/>} />
      <Route path="/adminProducts" element={< AdminProducts/>} />
      <Route path="/editProduct/:id" element={< EditProduct/>} />
    </Routes>
    </>
    )
}
export default App;