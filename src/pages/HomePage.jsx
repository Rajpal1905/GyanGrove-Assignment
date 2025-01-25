import React from "react";
import AddItemForm from "../components/AddItemForm";
import InventoryTable from "../components/InventoryTable";

function HomePage() {
  return (
    <div className="container">
      <AddItemForm />
      <InventoryTable />
    </div>
  );
}

export default HomePage;
