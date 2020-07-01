import React from "react";
import './scss/styles.scss'
import { parse } from "papaparse";
import Dropzone from "react-dropzone";



export default function UploadCSV() {
    
    const [orders, setOrders] = React.useState([]);
    const [fileNames, setFileNames] = React.useState([]);
    const handleDrop = (acceptedFiles) => {
        setFileNames(acceptedFiles.map(file => file.name));
        acceptedFiles.forEach(async (file) => {
            const text = await file.text();
            const result = parse(text, {header: true});
            setOrders((existing) => [...existing, ...result.data]);
            console.log(result.data)        
        });
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
                
                {orders.map((order) => (
                <li key={order.tracking}>
                    <strong>{order.tracking}</strong>: {order.item_sku}
                </li>
                ))}
            </ul>
        </div>
        </div>
  );
}
  