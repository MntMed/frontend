import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    User_ID: "",
    Product_ID: "",
    Category: "",
    Price: "",
    Discount: "",
    Final_Price: "",
    Payment_Method: "",
    Purchase_Date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/products/${id}`, product)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            name="User_ID"
            value={product.User_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            name="Product_ID"
            value={product.Product_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            name="Category"
            value={product.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            name="Price"
            type="number"
            value={product.Price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discount:</label>
          <input
            name="Discount"
            type="number"
            value={product.Discount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Final Price:</label>
          <input
            name="Final_Price"
            type="number"
            value={product.Final_Price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            name="Payment_Method"
            value={product.Payment_Method}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Purchase Date:</label>
          <input
            name="Purchase_Date"
            type="date"
            value={product.Purchase_Date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
