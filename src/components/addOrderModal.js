import React, { useState } from "react";
import Modal from "react-modal";
import "./addOrderModal.css";

Modal.setAppElement("#root");

const AddOrderModal = ({ isOpen, closeModal, handleAddOrder }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const newOrder = { client: selectedClient, notes: notes };
    handleAddOrder(newOrder);
    closeModal();
  };
  

  return (
    <Modal
      isOpen={isOpen}
      //onRequestClose={closeModal}
      contentLabel="Add Order Modal"
    >
      <h2>Add Order</h2>
      <form>
        <label>
          Client:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Select a client</option>
            <option value="Šarūnas Bieliūnas">Šarūnas Bieliūnas</option>
            <option value="Domas Morkūnas">Domas Morkūnas</option>
            <option value="Dovilė Štriūnaitė">Dovilė Štriūnaitė</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>
        <div className="buttons-container">
          <button onClick={ handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModal;