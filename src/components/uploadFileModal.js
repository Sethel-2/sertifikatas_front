import React, { useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";


Modal.setAppElement("#root");

const UploadFileModal = ({ isOpen, closeModal, onSave, order }) => {
  const [uploadedFiles, setUploadedFiles] = useState([...order.additionalFiles]);

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
      ...order,
      additionalFiles: uploadedFiles,
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
      <h2>Papildomi failai</h2>
      <form>
        <label>
          Įkelti failus:
          <input type="file" onChange={handleFileUpload} />
        </label>
        <div className="uploaded-files-container">
          <h3>Įkelti failai:</h3>
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
              <li>Nėra failų</li>
            )}
          </ul>
        </div>
        <div className="buttons-container">
          <Button text="Išsaugoti" onClick={handleSave} />
          <Button text="Uždaryti" onClick={closeModal} />
        </div>
      </form>
    </Modal>
  );
};

export default UploadFileModal;
