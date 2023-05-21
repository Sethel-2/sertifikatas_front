import React, { useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";
import "./uploadFileModal.css"

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

  const handleFileDelete = (fileToDelete) => {
    const filteredFiles = uploadedFiles.filter((file) => file !== fileToDelete);
    setUploadedFiles(filteredFiles);
  };

  const handleSave = () => {
    const updatedOrder = {
      ...order,
      additionalFiles: uploadedFiles,
    };                    
   // onSave(updatedOrder);
    closeModal();
  };

  return (
    <Modal className = "extra-files"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Order Modal"
    >
      <h2>Papildomi failai</h2>
      <form>
        <label className="file-label">
          Įkelti failus:
          <input type="file" onChange={handleFileUpload} />
        </label>
        <div className="uploaded-files-container">
          <h3 className = "file-label">Failai</h3>
          <ul className="uploaded-files-list">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <li key={index}>
                  <div className="file-info">
                    <a href="file-download" onClick={() => handleFileDownload(file)}>
                      {file.name}
                    </a>
                    <Button className="delete-file-button" text="Ištrinti" onClick={() => handleFileDelete(file)} />
                  </div>
                  <hr className="file-separator" />
                </li>
              ))
            ) : (
              <li>Nėra failų</li>
            )}
          </ul>
        </div>
        <div className="buttons-container">
          <Button className="link1" text="Išsaugoti" onClick={handleSave} />
          <Button className="link1" text="Uždaryti" onClick={closeModal} />
        </div>
      </form>
    </Modal>
  );
};

export default UploadFileModal;
