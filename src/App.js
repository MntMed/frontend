import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";


function App() {
  return (
    <Router>
      <div className="container">
        <h1>E-commerce Management</h1>
        <nav>
          <Link to="/">Product List</Link> | <Link to="/add">Add Product</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
