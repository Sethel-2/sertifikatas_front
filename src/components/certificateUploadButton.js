import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function CertificateUploadButton({ onUpload }) {
  const [certificateFile, setCertificateFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCertificateFile(file);
    onUpload(file);
  };

  const handleDeleteFile = () => {
    setCertificateFile(null);
    onUpload(null);
  };

  const handleIconClick = () => {
    document.getElementById("certificate-file-input").click();
  };

  return (
    <>
      <input
        id="certificate-file-input"
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {certificateFile ? (
        <>
          <p>File uploaded: {certificateFile.name}</p>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleDeleteFile}
            style={{ cursor: "pointer" }}
          />
        </>
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