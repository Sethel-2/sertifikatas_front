import React, { useState } from 'react';
import Modal from 'react-modal';
import './editClientModal.css';

Modal.setAppElement('#root');

function EditClientModal({ isOpen, closeModal, client, onSave }) {
 
  const [editedClient, setEditedClient] = useState(client);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: name === 'id' ? prevClient.id : value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedClient);
    closeModal();
  };
 
  return (
    <Modal className="edit-client-modal" overlayClassName="edit-client-overlay" isOpen={isOpen} onRequestClose={closeModal}>
      <h2 className="edit-client-heading">Edit Client</h2>
      <form>
        <div className="edit-client-input-group">
          <label htmlFor="firstName" className="edit-client-label">Vardas:</label>
          <input type="text" id="firstName" name="firstName" value={editedClient.firstName} onChange={handleInputChange} className="edit-client-input" />
        </div>
        <div className="edit-client-input-group">
          <label htmlFor="lastName" className="edit-client-label">Pavardė:</label>
          <input type="text" id="lastName" name="lastName" value={editedClient.lastName} onChange={handleInputChange} className="edit-client-input" />
        </div>
        <div className="edit-client-input-group">
          <label htmlFor="email" className="edit-client-label">El. paštas:</label>
          <input type="email" id="email" name="email" value={editedClient.email} onChange={handleInputChange} className="edit-client-input" />
        </div>
        <div className="edit-client-input-group">
          <label htmlFor="phone" className="edit-client-label">Telefono numeris:</label>
          <input type="tel" id="phone" name="phone" value={editedClient.phone} onChange={handleInputChange} className="edit-client-input" />
        </div>
      </form>
      <div className = "save-edit-container">
      <button onClick={handleSaveClick} className="edit-client-save-btn">Save</button>
      <button onClick={closeModal} className="edit-client-cancel-btn">Cancel</button>
      </div>
    </Modal>
  );
}

export default EditClientModal;
