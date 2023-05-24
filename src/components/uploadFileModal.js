import React, { useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import Button from "./button";
import "./uploadFileModal.css"
import { deleteFile, uploadFiles } from "../api/file";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const UploadFileModal = ({ isOpen, closeModal, setSelectedOrder, order, onSave }) => {
  const [uploadedFiles, setUploadedFiles] = useState([...order.additionalFiles]);
  const [certificateFiles, setCertificateFiles] = useState();

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if(type === "certificate"){
      setCertificateFiles(file)
    }
    else{
      setUploadedFiles([...uploadedFiles, file]);
    }
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

  const handleFileDelete = async (id, action, type) => {
    const {file, message} = await deleteFile(id)
    if(!file){
      toast.error(message)
      return
    }
    if(action === "delete")
    {
      const additionalFiles = type ==="additional" ? order.additionalFiles.filter(fileId => fileId!==id) : order.additionalFiles;
      const updatedOrder = {
        ...order,
        certificateFile: type==="certificate" ? null: order.certificateFile,
        additionalFiles
      }
      onSave(updatedOrder)
      setSelectedOrder(updatedOrder)
      setCertificateFiles(undefined)
    }
    // const filteredFiles = uploadedFiles.filter((file) => file !== fileToDelete);
    // setUploadedFiles(filteredFiles);
  };
 
  const handleSave = async (event) => {
    event.preventDefault();
    if(!certificateFiles){
      closeModal();
      return
    }
    if(order.certificateFile){
      handleFileDelete(order.certificateFile._id, "replace", "certificate")
    }
    const {success, message, files} = await uploadFiles({files: [certificateFiles], orderId: order._id, type: "certificate"})
    if(!success && files.length === 0){
      toast.error(message)
      return
    }
    const updatedOrder = {...order, certificateFile: files[0]}
    onSave(updatedOrder)
    setSelectedOrder(updatedOrder)
    toast.success("Išsaugota")
    closeModal();
  };
  return (
    <Modal className = "extra-files"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Order Modal"
    >
      <h2>Dokumentai</h2>
      
      <div className="uploaded-files-container mb-0">
      <h3 className="file-label">Sertifikatas</h3>
      <ul className="uploaded-files-list">
        <li>
          {order.certificateFile ? (
            <div className="file-info">
              <a href={order.certificateFile.url}>{order.certificateFile.originalname}</a>
              <Button className="delete-file-button" text="Ištrinti" onClick={() => handleFileDelete(order.certificateFile._id, "delete", "certificate")} />
            </div>
          ) : (
            'Nėra dokumentų'
          )}
        </li>
      </ul>
    </div>

        <label className="file-label">{order.certificateFile ? "Atnaujinti sertifikatą": "Įkelti sertifikatą"}
        <input type="file" onChange= {(event)=>handleFileUpload(event, "certificate")}>
          </input>
          </label>
          <div className="uploaded-files-container">
          <h3 className = "file-label">Papildomi dokumentai</h3>
          <ul className="uploaded-files-list">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <li key={index}>
                  <div className="file-info">
                    <a href="file-download" onClick={() => handleFileDownload(file)}>
                      {file.name}
                    </a>
                    {/* <Button className="delete-file-button" text="Ištrinti" onClick={() => handleFileDelete(file)} /> */}
                  </div>
                  <hr className="file-separator" />
                </li>
              ))
            ) : (
              <li>Nėra dokumentų</li>
            )}
          </ul>
        </div>
        <label className="file-label">
          Įkelti papildomus dokumentus:
          <input type="file" onChange={handleFileUpload} />
        </label>
        
        <div className="buttons-container">
          <Button className="link1" text="Išsaugoti" onClick={handleSave} />
          <Button className="link1" text="Uždaryti" onClick={closeModal} />
        </div>
      
    </Modal>
  );
};

export default UploadFileModal;
