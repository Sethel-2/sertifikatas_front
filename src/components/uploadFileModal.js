import React, { useRef, useState } from "react";
import Modal from "react-modal";
import "./editModal.css";
import "./overlay.css";
import Button from "./button";
import "./uploadFileModal.css"
import { deleteFile, deleteFiles, uploadFiles } from "../api/file";
import { toast } from "react-toastify";
import loadingGif from '../images/loading-gif.gif'

Modal.setAppElement("#root");

const UploadFileModal = ({ isOpen, closeModal, setSelectedOrder, order, updateOrder }) => {
  const [filesToUpload, setFilesToUpload] = useState([])
  const [filesToDelete, setFilesToDelete] = useState([])
  const [certificateFile, setCertificateFile] = useState();
  const [deleteCertificate, setDeleteCertificate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const certInputRef = useRef()

  const handleClose = () => {
    setFilesToDelete([])
    setFilesToUpload([])
    setCertificateFile(undefined)
    setDeleteCertificate(false)
    closeModal()
  }

  const removeFileToUpload = (index) => {
    setFilesToUpload(prev => {
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if(type === "certificate"){
      setCertificateFile(file)
    }
    else{
      setFilesToUpload([...filesToUpload, file]);
      event.target.value = ''
    }
  };

  const filterDeleted = (file) => {
    return !filesToDelete.includes(file._id)
  }

  const handleSubmitCertificate= async () => {
    // replace certificate
    if (certificateFile) {
      // If certificate exists, delete already existing one
      if (order.certificateFile) {
        const {file, message} = await deleteFile(order.certificateFile._id)
        if(!file){
          toast.error(message)
          return { certificate: null, error: true }
        }
      }

      const { success, message: uploadMessage, files } = await uploadFiles({files: [certificateFile], orderId: order._id, type: "certificate"})
      if (!success && files.length === 0){
        toast.error(uploadMessage)
        return { certificate: null, error: true }
      }
      
      return { certificate: files[0], error: false  }
    }

    // remove certificate
    if (deleteCertificate) {
      const {file, message} = await deleteFile(order.certificateFile._id)
      if(!file){
        toast.error(message)
        return { certificate: null, error: true }
      }

      return { certificate: null, error: false }
    }

    return { certificate: order.certificateFile, error: false }
  }
  
  const handleSubmitFiles = async () => {
    if (filesToDelete.length !== 0) {
      const { success, message } = await deleteFiles(filesToDelete)
      if (!success) {
        toast.error(message)
        return { additionalFiles: [], error: true }
      }
    }

    if (filesToUpload.length !== 0) {
      const { success, message, files } = await uploadFiles({files: filesToUpload, orderId: order._id, type: "additional"})
      if (!success && files.length === 0) {
        toast.error(message)
        return { additionalFiles: [], error: true }
      }

      return { additionalFiles: files, error: false }
    }

    return { additionalFiles: [], error: false }
  }

  const handleSave = async (event) => {
    setIsLoading(true)
    event.preventDefault();

    const { certificate, error: certificateError } = await handleSubmitCertificate()
    if (certificateError) {
      setIsLoading(false)
      return
    }

    const { additionalFiles, error: additionalFilesError } = await handleSubmitFiles()
    if (additionalFilesError) {
      setIsLoading(false)
      return
    }

    const updatedOrder = {
      ...order,
      certificateFile: certificate,
      additionalFiles: [...order.additionalFiles.filter(filterDeleted), ...additionalFiles]
    }

    updateOrder(updatedOrder)
    setSelectedOrder(updatedOrder)
    toast.success("Išsaugota")
    setIsLoading(false)
    handleClose()
  }

  return (
    <>
    {isOpen && isLoading ? <div className="loading-overlay">
      <img src={loadingGif} alt="loading" />
    </div> : null}
    <Modal className = "extra-files"
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Edit Order Modal"
    >
      <h2>Dokumentai</h2>
      
      <div className="uploaded-files-container mb-0">
      <h3 className="file-label">Sertifikatas</h3>
      <ul className="uploaded-files-list">
        <li>
          {order.certificateFile && !deleteCertificate ? (
            <div className="file-info">
              <a href={order.certificateFile.url}>{order.certificateFile.originalname}</a>
              <Button className="delete-file-button" text="Ištrinti" onClick={() => setDeleteCertificate(true)} />
            </div>
          ) : (
            'Nėra dokumentų'
          )}
        </li>
      </ul>
    </div>

        <label className="file-label">{order.certificateFile ? "Atnaujinti sertifikatą": "Įkelti sertifikatą"}
        <input type="file" onChange= {(event)=>handleFileUpload(event, "certificate")} ref={certInputRef} />
        <Button className="delete-file-button" text="Išvalyti" onClick={() => {
           certInputRef.current.value = ''
           setCertificateFile(undefined)
        }} />
          </label>
          <div className="uploaded-files-container">
          <h3 className = "file-label">Papildomi dokumentai</h3>
          <ul className="uploaded-files-list">
            {order.additionalFiles.length > 0 ? (
              order.additionalFiles.map((file, index) => 
                filesToDelete.includes(file._id) ? null : (
                  <li key={index}>
                    <div className="file-info">
                      <a href={file.url}>
                        {file.originalname}
                      </a>
                      <Button className="delete-file-button" text="Ištrinti" onClick={() => setFilesToDelete(prev => [...prev, file._id])} />
                    </div>
                    <hr className="file-separator" />
                  </li>
                )
              )
            ) : (
              <li>Nėra dokumentų</li>
            )}
          </ul>
        </div>
        <label className="file-label">
          Įkelti papildomus dokumentus:
          <input id="additional-files-input" type="file" onChange={handleFileUpload} />
        </label>
        <ul className="uploaded-files-list">
          {filesToUpload.length > 0 ? (
            filesToUpload.map((file, index) => (
              <li key={index}>
                <div className="file-info">
                  <div>
                    {file.name}
                  </div>
                  <Button className="delete-file-button" text="Ištrinti" onClick={() => removeFileToUpload(index)} />
                </div>
                <hr className="file-separator" />
              </li>
            ))
          ) : (
            <li>Nėra dokumentų</li>
          )}
        </ul>
        
        <div className="buttons-container">
          <Button className="link1" text="Išsaugoti" onClick={handleSave} />
          <Button className="link1" text="Uždaryti" onClick={handleClose} />
        </div>
      
    </Modal></>
  );
};

export default UploadFileModal;
