import React from "react";
import {Table, Button} from 'antd';
import ReactToPrint from 'react-to-print';

export default class OpeTable extends React.Component {
    render(){
        return(
            <div>
            <OperationTable  ref={el => (this.componentRef = el)}/>
            <ReactToPrint
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

class OperationTable extends React.Component {
    
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
        const upgrade_data = [{}];
        return (
            <Table pagination={{
                total: upgrade_data.length, 
                pageSize: upgrade_data.length, 
                hideOnSinglePage:true}}
                columns={columns} 
                //dataSource={upgrade_data}
            />
        );
    }
}