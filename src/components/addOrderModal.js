import React, { useState } from "react";
import Modal from "react-modal";
import "./addOrderModal.css";

Modal.setAppElement("#root");

const AddOrderModal = ({ isOpen, closeModal, handleAddOrder, clients }) => {
  const [selectedClient, setSelectedClient] = useState(clients.length > 0 ? clients[0]._id : "");
  const [notes, setNotes] = useState("");
//to do: replace client id with selected client
  const handleSave = () => {
    const newOrder = { client: selectedClient, notes: notes, createdAt: new Date()};
    handleAddOrder(newOrder);
    closeModal();
  };
  

  return (
    <Modal
      isOpen={isOpen}
      //onRequestClose={closeModal}
      contentLabel="Add Order Modal"
    >
      <h2>Pridėti užsakymą</h2>
      <form>
        <label>
          Klientai:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}>
            {clients.map((client) => <option value= {client._id}>{client.fullName}</option>)}
          </select>
        </label>
        <label>
          Pastabos:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>
        <div className="buttons-container">
          <button className = "link1" onClick={ handleSave}>Išsaugoti</button>
          <button className = "link1" onClick={closeModal}>Atšaukti</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModal;