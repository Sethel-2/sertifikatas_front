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
      <h2>Pridėti užsakymą</h2>
      <form>
        <label>
          Klientai:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Pasirinkti klientą</option>
            <option value="Šarūnas Bieliūnas">Šarūnas Bieliūnas</option>
            <option value="Domas Morkūnas">Domas Morkūnas</option>
            <option value="Dovilė Štriūnaitė">Dovilė Štriūnaitė</option>
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
          <button onClick={ handleSave}>Išsaugoti</button>
          <button onClick={closeModal}>Atšaukti</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModal;