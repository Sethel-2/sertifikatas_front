import React, { useState } from "react";
import Modal from "react-modal";
import "./addClientModal.css";

Modal.setAppElement("#root");

const AddClientModal = ({ isOpen, closeModal, handleAddClient, clients }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    const lastClientId = clients && clients.length > 0 ? clients[clients.length - 1].id : "0";
    console.log(clients.length);

    const newClient = {
      id: parseInt(lastClientId) + 1,
      firstName,
      lastName,
      email,
      phone,
      createdDate: new Date().toISOString().slice(0, 10),
    };
    handleAddClient(newClient);
    closeModal();
  };
  

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add Client Modal"
    >
      <h2>Pridėti klientą</h2>
      <form>
        <label>
          Vardas:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Pavardė:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          El.paštas:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Telefono Nr.:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <div className="buttons-container">
          <button onClick={handleSave}>Pridėti</button>
          <button onClick={closeModal}>Atšaukti</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClientModal;
