import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./page/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
