import React from "react";
import {Table} from 'antd';

export default class OpeartionTable extends React.Component {
    
    
    
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