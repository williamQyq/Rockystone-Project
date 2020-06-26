import React, { useState } from "react";
import './scss/main_container.scss'

import Dropzone from "react-dropzone";



export default function UploadCSV() {
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = acceptedFiles =>
        setFileNames(acceptedFiles.map(file => file.name));

    return (
        <div className="drop-zone">
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop files, or click to select files</p>
            </div>
            )}
        </Dropzone>
        <div>
            <strong>Files:</strong>
            <ul>
            {fileNames.map(fileName => (
                <li key={fileName}>{fileName}</li>
            ))}
            </ul>
        </div>
        </div>
  );
}
  