import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Pour la navigation après ajout

const AddProduct = () => {
  const [formData, setFormData] = useState({
    User_ID: "",
    Product_ID: "",
    Category: "",
    Price: "",
    Final_Price: "",
    Payment_Method: "",
    Purchase_Date: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation des champs
    if (
      !formData.User_ID ||
      !formData.Product_ID ||
      !formData.Category ||
      !formData.Price ||
      !formData.Final_Price ||
      !formData.Payment_Method ||
      !formData.Purchase_Date
    ) {
      setError("Tous les champs sont requis.");
      return;
    }

    // Envoyer la requête POST à l'API pour ajouter le produit
    axios
      .post("http://localhost:5000/products", formData)
      .then((response) => {
        console.log("Produit ajouté:", response.data);
        navigate("/products"); // Redirige vers la liste des produits après ajout
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout du produit:", err);
        setError("Erreur lors de l'ajout du produit.");
      });
  };

  return (
    <div>
      <h2>Ajouter un produit</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          User ID:
          <input
            type="text"
            name="User_ID"
            value={formData.User_ID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Product ID:
          <input
            type="text"
            name="Product_ID"
            value={formData.Product_ID}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Final Price:
          <input
            type="number"
            name="Final_Price"
            value={formData.Final_Price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Payment Method:
          <input
            type="text"
            name="Payment_Method"
            value={formData.Payment_Method}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Purchase Date:
          <input
            type="date"
            name="Purchase_Date"
            value={formData.Purchase_Date}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AddProduct;
