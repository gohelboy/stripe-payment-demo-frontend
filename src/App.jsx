import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Cancel from "./Pages/Cancel/Cancel";
import Confirm from "./Pages/Confirm/Confirm";

function App() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
  );
}

export default App;
