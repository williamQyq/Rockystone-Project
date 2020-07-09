import React from "react";
import './scss/styles.scss'
import { parse } from "papaparse";
import Dropzone from "react-dropzone";
import {data} from './data';



export default function UploadCSV() {
    //const [count, setCount] = React.useState(0);
    
    const [orders, setOrders] = React.useState([]);
    const [fileNames, setFileNames] = React.useState([]);
    const handleDrop = (acceptedFiles) => {
        setFileNames(acceptedFiles.map(file => file.name));
        acceptedFiles.forEach(async (file) => {
            const text = await file.text();
            const result = parse(text, {header: true});
            setOrders((existing) => [...existing, ...result.data]);
            //console.log(result.data);        
        });

        process_order(orders);
    
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
                
                {orders.map((order,i)=>(
                <li key={i}>
                    <strong>{order.tracking}</strong>: {order.item_sku}
                </li>
                ))}
            </ul>
        </div>
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
    let upgraded_upc;
    let upgraded_config;
    let sku_parse=[];

    const upc_index = 0;
    const config_index = 1;
    const bundle_index = 2;

    //split upgraded upc, upgraded config, bundle
    if(typeof sku == 'string') {
        sku_parse = sku.split('-');
        upgraded_upc = sku_parse[upc_index];
        upgraded_config = sku_parse[config_index];
        
        console.log("upgraded Config==========="+upgraded_config);
    
        //get original config
        data.map((data,index) => {
            if(data.upc === upgraded_upc) {
                //compare ram;
                let ram_obj = data.ram;
                let m2_obj = data.m2;
                let hard_drive_obj = data.hard_drive;
                compare_config(upgraded_config,ram_obj,m2_obj,hard_drive_obj);
            }
            return true;
        })
    }
    
}

function compare_config(config,ram,ssd){
    let ram_slot_num = Object.keys(ram).length;
    const pivot = 16;
    let upgraded_config = {};
    let upg_ram_capacity,upg_ssd_capacity,upg_hdd_capacity;
    let ram_tmp=[];
    
    
    //get upgraded ram, upgraded ssd , upgraded hdd capacity
    upg_ram_capacity = chunkString2Int(config,0,2);
    upg_ssd_capacity = chunkString2Int(config,2,6);
    upg_hdd_capacity = chunkString2Int(config,6,8);
    let ssd_type = config.substring(config.length - 1);
    
    //push ram[] into object
   
    upgraded_config["ram"]=ram;

    //push ssd[] into object
    switch(ssd_type){
        case 'N':
            upgraded_config["m2"]={
                sata:upg_ssd_capacity
            }
            break;
        case 'P':
            upgraded_config["m2"]={
                pcie:upg_ssd_capacity
            }
            break;
        case 'V':
            upgraded_config["m2"]={
                nvme:upg_ssd_capacity
            }
            break;
        default:
            return false;
    }
    
    return upgraded_config;
}

function chunkString2Int(str, i,j){
    let substr = str.substring(i,j);
    let integer = parseInt(substr,10);
    return integer;
}