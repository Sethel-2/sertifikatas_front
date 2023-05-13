import React, { useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";


Modal.setAppElement("#root");

const EditOrderModal = ({ isOpen, closeModal, onSave, order }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFiles([...uploadedFiles, file]);
  };

  const handleFileDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    const updatedOrder=  {
      id: order.id,
      client:  selectedClient ? selectedClient:order.client,
      notes: notes ? notes:order.notes,
      state: order.state,
      certificate: order.certificate,
      additionalFiles: uploadedFiles,
      createdAt: order.createdAt
    };                    
    onSave(updatedOrder);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Order Modal"
    >
      <h2>Redaguoti užsakymą</h2>
      <form>
        <label>
          Klientai:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Pasirinkti klientą</option>
            <option value="Benas Jarsolavičius">Benas Jarsolavičius</option>
            <option value="Tada Jasinskis">Tada Jasinskis</option>
            <option value="Rokas Lukoševičius">Rokas Lukoševičius</option>
          </select>
        </label>
        
        <div className="uploaded-files-container">
         
            
        
        </div>
        <label>
          Pastabos:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>
        <div className="buttons-container">
          <Button text="Išsaugoti" onClick={handleSave} />
          <Button text="Uždaryti" onClick={closeModal} />
        </div>
      </form>
    </Modal>
  );
};

export default EditOrderModal;

