import React, { useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";

Modal.setAppElement("#root");

const EditOrderModal = ({ isOpen, closeModal, onSave }) => {
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
    onSave(selectedClient, notes);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Order Modal"
    >
      <h2>Edit Order</h2>
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
          Upload file:
          <input type="file" onChange={handleFileUpload} />
        </label>
        <div className="uploaded-files-container">
          <h3>Uploaded Files:</h3>
          <ul className="uploaded-files-list">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <li key={index}>
                  <a href="file-download" onClick={() => handleFileDownload(file)}>
                    {file.name}
                  </a>
                </li>
              ))
            ) : (
              <li>No files uploaded</li>
            )}
          </ul>
        </div>
        <label>
          Pastabos:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </label>
        <div className="buttons-container">
          <Button text="Save" onClick={handleSave} />
          <Button text="Close" onClick={closeModal} />
        </div>
      </form>
    </Modal>
  );
};

export default EditOrderModal;

