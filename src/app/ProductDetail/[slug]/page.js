"use client";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [numero, setNumero] = useState("");
  const [error, setError] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [showUpdateStock, setShowUpdatetock] = useState(false);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleToggle = () => {
    setShowAddStock(!showAddStock);
  };
  const handleToggleUpdate = () => {
    setShowUpdatetock(!showUpdateStock);
  };
  useEffect(() => {
    const infoProduct = async () => {
      try {
        if (slug) {
          const response = await fetch(`/api/products/${slug}`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Cant get this product");
          }
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("ERROR, we cant get this product info", error);
      }
    };
    infoProduct();
  }, [slug]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setNumero("");
      setError("");
      return;
    }

    const numValue = parseInt(value, 10);

    if (
      isNaN(numValue) ||
      numValue <= 0 ||
      numValue > product.weeklyRequiredQuantity
    ) {
      setError(`The amount you enter exceeds the required amount per week`);
    } else {
      setError("");
    }

    setNumero(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: numero }),
      });
      const data = await response.json();
      console.log(data);
      toast.success("Stock updated seccessfully", {
        onClose: () => router.push("/"),
      });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {loading && (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <div className="p-8 container max-w-screen-md mx-auto">
          <div className="p-8 container bg-gray-200 mx-auto rounded-xl shadow-xl">
            <div className="text-blue-700">
              <IoArrowBackCircle
                onClick={handleBack}
                className="text-blue-600 cursor-pointer"
                size={30}
              />
            </div>
            <div className="text-blue-700">
              <span className="text-gray-500">Product:</span>
              <h1 className="text-2xl font- mb-4">{product.name}</h1>
            </div>
            <div className="text-blue-700">
              <span className="text-gray-500">External ID:</span>
              <h1 className="text-2xl font- mb-4">{product.externalId}</h1>
            </div>
            <div className="text-blue-700">
              <span className="text-gray-500">Product Type:</span>
              <h1 className="text-2xl font- mb-4">{product.productType}</h1>
            </div>
            <div className="text-blue-700">
              <span className="text-gray-500">Cost:</span>
              <h1 className="text-2xl font- mb-4">$ {product.cost}</h1>
            </div>

            <div className="text-blue-700">
              <span className="text-gray-500">Weekly Required Quantity:</span>
              <h1 className="text-2xl font- mb-4">
                {product.weeklyRequiredQuantity}
              </h1>
            </div>
            <div className="text-blue-700">
              <span className="text-gray-500">Stock:</span>
              <h1 className="text-2xl font- mb-4">{product.stock}</h1>
              {product.stock < product.weeklyRequiredQuantity / 2 && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50 "
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Alert!</span> You need to replenish the stock of this product
                  </div>
                </div>
              )}
            </div>

            <div className="container mx-auto rounded-xl shadow-xl p-5">
              <h2 className="text-blue-700 text-2xl font- text-center p-5">
                Add new stock
              </h2>

              <form className="max-w-full mx-auto p-4" onSubmit={handleSubmit}>
                <label
                  for="number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount of stock:
                </label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  value={numero}
                  onChange={handleChange}
                  min="1"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="mt-5">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  Send
                </button>
                  </div>
                  
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
