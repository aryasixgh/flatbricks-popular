import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PropertyList from "./pages/propertyList";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="bg-white">
          <PropertyList />
        </div>
      </Router>
    </>
  );
}

export default App;
