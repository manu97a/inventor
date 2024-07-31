"use client";
import { useState } from "react";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddproductForm = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    productName: "",
    externalId: "",
    productType: "",
    internalReference: "",
    cost: "",
    vendors: "",
    weeklyRequiredQuantity: "",
  });
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validateForm = () => {
    const { externalId, cost, weeklyRequiredQuantity } = product;
    const externalIdRegex = /^[A-Z0-9]+$/;
    const costRegex = /^\d+(\.\d{1,2})?$/;
    const weeklyRequiredQuantityRegex = /^\d+$/;

    if (!externalIdRegex.test(externalId)) {
      toast.error("External ID must be uppercase letters and numbers only, without spaces.");
      return false;
    }

    if (!costRegex.test(cost)) {
      toast.error("Cost must be a number with up to two decimal places.");
      return false;
    }

    if (!weeklyRequiredQuantityRegex.test(weeklyRequiredQuantity)) {
      toast.error("Weekly Required Quantity must be a number.");
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic here
      toast.success("Form submitted successfully!");
    }
  };
  return (
    <div className="p-8 container max-w-screen-md mx-auto">
      <div className="p-8 container bg-gray-200 mx-auto rounded-xl shadow-xl">
        <div className="text-blue-700">
          <IoArrowBackCircle
            onClick={handleBack}
            className="text-blue-600 cursor-pointer"
            size={30}
          />
        </div>
        <form className="p-8 container max-w-screen-md mx-auto" onSubmit={handleSubmit}>
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
              name="productName"
              value={product.productName}
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
              name="externalId"
              value={product.externalId}
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
              name="productType"
              value={product.productType}
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
              name="internalReference"
              value={product.internalReference}
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
              name="cost"
              value={product.cost}
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
              name="vendors"
              value={product.vendors}
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
              name="weeklyRequiredQuantity"
              value={product.weeklyRequiredQuantity}
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
      </div>
    </div>
  );
};

export default AddproductForm;
