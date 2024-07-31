"use client";
import { useEffect, useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState({
    name: "",
    externalId: "",
    productType: "",
    internalReference: "",
    cost: "",
    vendors: "",
    weeklyRequiredQuantity: "",
  });
  const [loading, setLoading] = useState(true);
  const { slug } = params;
  const router = useRouter();
  const handleBack = () => {
    router.back();
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
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const updatedProduct = await response.json();
      console.log(updatedProduct);
      setProduct(updatedProduct);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <>
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
        <>
          <div className="p-8 container max-w-screen-md mx-auto">
            <div className="p-8 container bg-gray-200 mx-auto rounded-xl shadow-xl">
              <div className="text-blue-700">
                <IoArrowBackCircle
                  onClick={handleBack}
                  className="text-blue-600 cursor-pointer"
                  size={30}
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-8 container max-w-screen-md mx-auto"
              >
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.name}
                    defaultValue={product.name}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    External ID
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.externalId}
                    defaultValue={product.externalId}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Product type
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.productType}
                    defaultValue={product.productType}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Internal Reference
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.internalReference}
                    defaultValue={product.internalReference}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Cost
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.cost}
                    defaultValue={product.cost}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Vendors
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.vendors}
                    defaultValue={product.vendors}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Weekly Required Quantity
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    placeholder={product.weeklyRequiredQuantity}
                    defaultValue={product.weeklyRequiredQuantity}
                    onChange={handleChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                  >
                    Send
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProduct;
