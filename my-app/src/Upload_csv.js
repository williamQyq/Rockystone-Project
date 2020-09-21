import React from "react";
import './scss/styles.scss'
import { parse } from "papaparse";
import {data} from './data';
import OperationTable from "./OperationTable";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload;

export default class OrderUpload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            orders: [],
            opers: [],
            // opers:[
            //     {
            //         ram_rm:[],
            //         ram_ug:[],
            //         m2_rm:[],
            //         m2_ug:[],
            //         hd_rm:[],
            //         hd_ug:[]
            //     },
            // ]
        };
        //this.*** = this.***.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }
    //simulate post request success status, elimate action props in Upload 
    customRequest = ({file, onSuccess})=>{
        setTimeout(()=>{
            onSuccess("ok");
        },0);
    }

    onChange=(info) =>{
        const { status } = info.file;
        if (status !== 'uploading') {
            //console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    async beforeUpload (file) {
        const text = await file.text();
        const result = parse(text,{header:true});
    
        let temp = this.state.orders;
        temp.push(...result.data);

        this.setState({orders:temp});

        this.process_order(this.state.orders);
    }
    process_order = (orders)=>{
        orders.map((order,i)=>
        {
            this.parse_sku(order.item_sku);
            return true;
        })
    }

    parse_sku = (sku)=>{
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
                        upc: data.upc,
                        ram: data.ram,
                        m2: data.m2,
                        hard_drive: data.hard_drive,
                    }
                    //base on original_config generate upgraded config.
                    upgraded_config = generate_config(str_config,original_config);
                    this.generate_operation(upgraded_config,original_config);
    
                }
                return true;
            })
        }
    }
    //config_1: upgraded configuration
    //config_2: original configuration
    generate_operation=(config_1, config_2)=>{

        let oper_str='';
    
        let temp_opers = [...this.state.opers];
        
        //add ram operations to oper_str[]
        for(let i = 0; i<config_2.ram.length; i++){
            if(config_1.ram[i]!== config_2.ram[i]){
                let oper_str1 = "内存拆下：-"+config_2.ram[i]+"GB\n";
                let oper_str2 = "内存装上：+"+config_1.ram[i]+"GB\n";
                
                oper_str += oper_str1;
                oper_str += oper_str2;
            }
        }

        let temp = {
            key:this.state.orders.length,
            upc:config_2.upc,
            operation:oper_str,
        };
        temp_opers.push(temp);
        this.setState({opers:temp_opers});
        console.log("*****",config_1);
        console.log("=====",config_2);
        
    }

    render(){
        return(
            <div className = "drop-zone">
                <Dragger accept=".csv" 
                         customRequest={this.customRequest}
                         onChange = {this.onChange}
                         beforeUpload = {this.beforeUpload}
                    >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                <OperationTable operations = {this.state.opers}/>
            </div>
        );
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
    let ram_combo= generate_ram_config(upg_ram_capacity,ram_slot_count);
    //console.log("ram combo================"+ram_combo);
    config["ram"] = ram_combo;
    
    //set m2 in config object
    //let m2_config = generate_m2_config(upg_ssd_capacity,ssd_type);
    //config["m2"] = m2_config;

    //set hard drive in config object
    //..............



    return config;

}
function generate_ram_config(ram_capacity,ram_slot_count){
    const base_ram_array = [0,4,8,16];
    let ram_combo=[];

    //generate combo for two ram slots
    if(ram_slot_count === 2){
        for(let i = 0; i< base_ram_array.length; i++){
            for(let j = 0; j<base_ram_array.length; i++){

                if(ram_capacity===(base_ram_array[i]+base_ram_array[j])) {
                    console.log("STATUS：Found Ram Combo.");
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
