import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import home from "../assets/bck.webp";
import "./home.css";
function Home()
{ const navigate= useNavigate();

    return(
       <div className="home"
       style={{
                backgroundImage: `url(${home})`
            }}
         >
        
             <h1 style={{ color: "white" }}>Welcome</h1>
       
        <br></br>
        <h1 style={{ color: "white" }}>Explore our collection of latest Books!</h1>
        <br></br>
        <br></br>
        <br></br>
    <Link to="/Books" className="browse-link">
        Browse Products&rarr;
    </Link>
   
        
         
         </div>

     )
}
export default Home;