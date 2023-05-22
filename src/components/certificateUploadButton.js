import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./certificateUploadButton.css";

function CertificateUploadButton({ onUpload, file }) {
  const [certificateFiles, setCertificateFiles] = useState
  ([]);
  
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setCertificateFiles(files);
    //onUpload(files);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...certificateFiles];
    newFiles.splice(index, 1);
    setCertificateFiles(newFiles);
   // onUpload(newFiles);
  };

  const handleIconClick = () => {
    document.getElementById("certificate-file-input").click();
  };

  const formatFileName = (fileName) => {
    if (fileName.length > 20) {
      return fileName.substring(0, 20) + "...";
    } else {
      return fileName;
    }
  };

  return (
    <>
      <input
        id="certificate-file-input"
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
      {certificateFiles.length > 0 ? (
        <div style={{ maxHeight: "40px", overflowY: "auto" }}>
          {certificateFiles.map((file, index) => {
            if(!file) return null;
           
            return <div key={index}>
            <a href={URL.createObjectURL(file)} download={file.name}>
              <p>{formatFileName(file.name)}</p>
            </a>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => handleDeleteFile(index)}
              style={{ cursor: "pointer" }}
            />
          </div>
          }
           
         )}
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faUpload}
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
}

export default CertificateUploadButton;
