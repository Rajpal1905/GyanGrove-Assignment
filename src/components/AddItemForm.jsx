import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slice/inventorySlice";
import toast from "react-hot-toast";

function AddItemForm() {
  const [formData, setFormData] = useState({ name: "", category: "", quantity: 0 });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(formData));
    toast.success("Item added successfully");
    setFormData({ name: "", category: "", quantity: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="number"
          className="w-full md:w-32 border border-gray-300 rounded-lg p-2"
          placeholder="Qty"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })
          }
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full md:w-auto"
      >
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
