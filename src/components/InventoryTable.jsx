import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, editItem, setFilter, setSort } from "../redux/slice/inventorySlice";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

function InventoryTable() {
  const { items, filter, sort } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: "",
    category: "",
    quantity: 0,
  });

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedItem = { ...currentItem };
    dispatch(editItem({ id: currentItem.id, updatedItem }));
    toast.success("Item updated successfully");
    setIsModalOpen(false);
  };

  const filteredItems = items.filter((item) =>
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) =>
    sort === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div>
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2"
          placeholder="Filter by Category"
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(setSort(sort === "asc" ? "desc" : "asc"))}
        >
          Sort by Quantity ({sort === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr
                key={item.id}
                className={item.quantity < 10 ? "bg-red-100" : "bg-white"}
              >
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2 flex gap-2">
  {/* Edit Button */}
  <button
    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg flex items-center gap-2"
    onClick={() => handleEdit(item)}
  >
    <FaEdit />
    <span className="hidden sm:inline">Edit</span>
  </button>
  
  {/* Delete Button */}
  <button
    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center gap-2"
    onClick={() => {
      dispatch(deleteItem(item.id));
      toast.error("Deleted successfully");
    }}
  >
    <RiDeleteBin6Line />
    <span className="hidden sm:inline">Delete</span>
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4">
            <h2 className="text-xl mb-4">Edit Item</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={currentItem.name}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, name: e.target.value })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={currentItem.category}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, category: e.target.value })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={currentItem.quantity}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      quantity: parseInt(e.target.value, 10),
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryTable;
