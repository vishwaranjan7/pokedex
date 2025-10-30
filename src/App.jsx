import { Link } from "react-router-dom";
import "./App.css";
import CustomRouter from "./Routes/CustomRoutes";

function App() {


  return (
    <div className="outer-pokedex">
      
     
      <h1 id="pokedex-heading">
        <Link to="/">Pokedex </Link>
        </h1>
      <CustomRouter />
    </div>
  );
}

export default App;
