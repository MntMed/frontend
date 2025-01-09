import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() =>
          setProducts(products.filter((product) => product._id !== id))
        )
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  // Calculer les indices pour la pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product List</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>User ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Product ID
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Category
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Final Price
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Payment Method
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Purchase Date
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr
              key={product._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product.User_ID}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product.Product_ID}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product.Category}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product['Price (Rs'][')']}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product['Final_Price(Rs'][')']}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {product.Payment_Method}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(product.Purchase_Date).toLocaleDateString()}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    margin: "5px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    margin: "5px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/edit/${product._id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          style={{
            padding: "10px 15px",
            margin: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px", margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{
            padding: "10px 15px",
            margin: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

