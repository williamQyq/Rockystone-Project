import ReactToPrint from 'react-to-print';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table,Button, Input, InputNumber, Popconfirm, Form } from 'antd';

export default class OperationTable extends React.Component {
   
    render(){

       // console.log("opers=====================",this.props.operations[0].upc);
        return(
            <div>
            <OperTable operations={this.props.operations} ref={el => (this.componentRef = el)}/>
            
            <ReactToPrint
                style={{whiteSpace:'pre'}}
                trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return <Button type="primary">Print this out!</Button>;
            }}
                content={() => this.componentRef}
            />
            </div>
        );
    }
}

class OperTable extends React.Component {

    render(){

        const columns = [
            {
                title:"Task ID",
                dataIndex: "task_id",
            },
            {
                title:"UPC",
                dataIndex:"upc",
            },
            {
                title:"operation",
                dataIndex:"operation"
            },
            
        ];
        return (
            <Table pagination={{
                total: this.props.operations.length, 
                pageSize: this.props.operations.length, 
                hideOnSinglePage:true}}
                style={{whiteSpace: 'pre'}}
                columns={columns} 
                dataSource={this.props.operations}
            />
        );
    }
}


