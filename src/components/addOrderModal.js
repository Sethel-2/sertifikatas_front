import React, { useState } from "react";
import Modal from "react-modal";
import "./addOrderModal.css";

Modal.setAppElement("#root");

const AddOrderModal = ({ isOpen, closeModal }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // Add code to save the new order to the table
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
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
            <option value="Client A">Client A</option>
            <option value="Client B">Client B</option>
            <option value="Client C">Client C</option>
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
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModal;