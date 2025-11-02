import { useState } from "react";
import reactLogo from "./assets/react.svg";
import PropertyList from "./pages/propertyList";
import FormPage from "./pages/formPage";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  const [page, setPage] = useState(false);

  return (
    <>
      <Router>
        <div className="">
          <button
            className="m-2.5"
            onClick={() => {
              setPage(!page);
            }}
          >
            {page ? "Form" : "Popular"}
          </button>
          {page ? <PropertyList /> : <FormPage />}
        </div>
      </Router>
    </>
  );
}

export default App;
