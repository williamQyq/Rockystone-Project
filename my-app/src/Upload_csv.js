import React from "react";
import './scss/styles.scss'
import { parse } from "papaparse";
import Dropzone from "react-dropzone";
import {data} from './data';
import OperationTable from "./OpeartionTable";
//import Dragger from "antd/lib/upload/Dragger";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload;
export default function UploadCSV() {
    //const [count, setCount] = React.useState(0);
    
    const [orders, setOrders] = React.useState([]);
    // const [fileNames, setFileNames] = React.useState([]);
    // const handleDrop = (acceptedFiles) => {
    //     setFileNames(acceptedFiles.map(file => file.name));
    //     acceptedFiles.forEach(async (file) => {
    //         const text = await file.text();
    //         const result = parse(text, {header: true});
    //         setOrders((existing) => [...existing, ...result.data]);
    //         //console.log(result.data);        
    //     });
    
    // }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(()=> {
            onSuccess("ok");
        },0);
    };

    const props={
        name: 'file',
        multiple: true,
        customRequest({file, onSuccess}){
            setTimeout(()=>{
                onSuccess("ok");
            },0);
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                //console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }

            // console.log("info================="+info.file);
        },
        // beforeUpload (file) {
        //     const reader = new FileReader();
    
        //     reader.onload = e => {
        //         console.log(e.target.result);
        //     };
        //     const text = reader.readAsText(file);
        //     const result = parse(text,{header:true});
        //     console.log(result.data);
    
        //     // Prevent upload
        //     return false;
        // }
    };

    //process_order(orders);
   
    


    return (
        <div className="drop-zone">
        {/* <Dropzone onDrop={handleDrop}>
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
                
                {orders.map((order,i)=>(
                <li key={i}>
                    <strong>{order.tracking}</strong>: {order.item_sku}
                </li>
                ))}
            </ul>
        </div> */}
        <Dragger accept=".csv" {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
        
        <OperationTable/>
        </div>
  );
}

function process_order(orders) {
    orders.map((order,i)=>
    {
        parse_sku(order.item_sku);
        //console.log(typeof order.item_sku);
        return true;
    })
}

function parse_sku(sku) {
    let str_upc;
    let str_config;
    let upgraded_config;
    let sku_parse=[];
    let original_config;

    const upc_index = 0;
    const config_index = 1;
    //const bundle_index = 2;

    //split upgraded upc, upgraded config, bundle
    if(typeof sku == 'string') {
        sku_parse = sku.split('-');
        str_upc = sku_parse[upc_index];
        str_config = sku_parse[config_index];
        
        console.log("upgraded Config==========="+str_config);
    
        //get original config
        data.map((data,index) => {
            if(data.upc === str_upc) {
                //compare ram;
                original_config={
                    ram: data.ram,
                    m2: data.m2,
                    hard_drive: data.hard_drive,
                }
                //base on original_config generate upgraded config.
                upgraded_config = generate_config(str_config,original_config);
                //compare_config(upgraded_config,original_config);

            }
            return true;
        })
    }
}

function generate_config(str, original_config){
    //parse str_config 
    let upg_ram_capacity = chunkString2Int(str,0,2);
    let upg_ssd_capacity = chunkString2Int(str,2,6);
    let upg_hdd_capacity = chunkString2Int(str,6,8);
    let ssd_type = str.substring(str.length - 1);
    let ram_slot_count = Object.keys(original_config.ram).length;

    let config = {};

    //set ram in config object
    let ram_combo= generate_ram_combo(upg_ram_capacity,ram_slot_count);
    console.log("ram combo================"+ram_combo);
    config["ram"] = ram_combo;
    



    return config;

}
function generate_ram_combo(ram_capacity,ram_slot_count){
    const base_ram_array = [0,4,8,16];
    let ram_combo=[];

    //generate combo for two ram slots
    if(ram_slot_count === 2){
        for(let i = 0; i< base_ram_array.length; i++){
            for(let j = 0; j<base_ram_array.length; i++){

                if(ram_capacity===(base_ram_array[i]+base_ram_array[j])) {
                    console.log("found Ram combo.");
                    ram_combo.push(base_ram_array[i]);
                    ram_combo.push(base_ram_array[j]);
                    return ram_combo;
                }
            }
        }
    } else if(ram_slot_count === 1){                         //generate combo for 1 ram slot
        for(let i= 0; i<base_ram_array.length; i++){
            if(ram_capacity===base_ram_array[i]){
                ram_combo.push(base_ram_array[i]);
                return ram_combo;
            }
        }
    }
}


function chunkString2Int(str, i,j){
    let substr = str.substring(i,j);
    let integer = parseInt(substr,10);
    return integer;
}
