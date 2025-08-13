import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [productList, setProductList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data && Array.isArray(response.data.products)) {
        setProductList(response.data.products);
      } else {
        setProductList([]);
        toast.info("No products available.");
      }
    } catch (error) {
      console.error("Error fetching product list:", error.message);
      setProductList([]);
      toast.error("Failed to fetch product list.");
    }
  };

  // Toast confirmation dialog for delete
  const confirmDeleteToast = (onConfirm) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to delete this product?</span>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss();
              onConfirm();
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const deleteProduct = (id) => {
    confirmDeleteToast(async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${backendUrl}/api/product/remove`,
          { id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          toast.success("✅ Product deleted successfully");
          fetchList(); // refresh list
        } else {
          toast.error("❌ Failed to delete product");
        }
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
        toast.error("❌ Failed to delete product");
      }
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2500} />
      <h1 className="text-2xl font-bold mb-4">All Product List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              productList.map((item, index) => (
                <tr key={item._id || index} className="text-center">
                  <td className="px-4 py-2 border">
                    {item.image && item.image.length > 0 ? (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="h-16 w-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{item.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{item.category || "N/A"}</td>
                  <td className="px-4 py-2 border">Rs {item.price || "0.00"}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => toast.info("Edit functionality coming soon!")}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
