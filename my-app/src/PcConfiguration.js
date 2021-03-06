import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space, Popover } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {data, content} from './data';

import ReactToPrint from 'react-to-print';

class PcConfiguration extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data:[{}]
  };
 
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Item Name',
        dataIndex: 'item_name',
        key: 'item_name',
        width: '20%',
        ...this.getColumnSearchProps('item_name'),
        render: (text) => <Popover title="Specifications" content = {content}>{text}</Popover>,
      },
      {
        title: 'upc',
        dataIndex: 'upc',
        key: 'upc',
        width: '20%',
        ...this.getColumnSearchProps('upc'),
      },
      {
        title: 'Ram',
        dataIndex: 'ram',
        key: 'ram',
        width: '20%',
        ...this.getColumnSearchProps('ram'),
      },
      {
        title: 'Hard Drive',
        dataIndex: 'hard_drive',
        key: 'hard_drive',
        ...this.getColumnSearchProps('hard_drive'),
      },
      
    ];

    //console.log(data);
    //const temp = JSON.stringify(data);
    console.log(typeof data);
    // const count = Object.keys(data[0]["ram"]).length;
    // console.log("count:========"+count)
    data.map((data,index) => {
      
        console.log(data.upc);
        return 1;
    })
    return (
        <div>
            
        <Table pagination={{total: data.length, pageSize: data.length, hideOnSinglePage:true}}columns={columns} dataSource={data}/>
        
        </div>
        );
  }
}

export default class Example extends React.Component {
    render() {
      return (
        <div>
          <PcConfiguration ref={el => (this.componentRef = el)} />
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
