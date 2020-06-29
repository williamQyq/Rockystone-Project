import React, { useState} from "react";
import './scss/styles.scss'
import { parse } from "papaparse";
import Dropzone from "react-dropzone";



export default function UploadCSV() {
    const [contacts, setContacts] = React.useState([
        {tracking: "ffff", item_sku: "Fake"},
    ]);
    const [orders, setOrders] = React.useState();
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = (acceptedFiles) => {
        setFileNames(acceptedFiles.map(file => file.name));
        acceptedFiles.forEach(async (file) => {
            const text = await file.text();
            const result = parse(text, {header: true});
            setContacts((existing) => [...existing, ...result.data]);
            console.log(result.data)        
        });
        // acceptedFiles.forEach(async (file) => {
        //     const text = await file.text();
        //     const reader = new FileReader();

        //     reader.onabort = () => console.log('file reading was aborted');
        //     reader.onerror = () => console.log('file reading has failed');
        //     reader.onload = () => {
        //         const binaryStr = reader.result
        //         console.log(binaryStr)
        //     }
        //     reader.readAsArrayBuffer(file)  
        // });
    }
    

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
            <ul>
                
                {contacts.map((contact) => (
                <li key={contact.tracking}>
                    <strong>{contact.tracking}</strong>: {contact.item_sku}
                </li>
                ))}
            </ul>
        </div>
        </div>
  );
}
  