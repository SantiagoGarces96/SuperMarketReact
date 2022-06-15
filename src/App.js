import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Routers from "./routers/Routers";

function App() {
  return (
    
    <div className="App">
      
      <BrowserRouter>
      <Routers />
    </BrowserRouter>
  
      
    </div>
  );
}

export default App;
