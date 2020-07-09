import React from 'react';

 const data = [
    {
      key: '0',
      upc: '19255825525',
      item_name: 'HP x360',
      ram:[4,4],
      m2:{
          sata:512,
          pcie:true,
          nvme:true
      },
      hard_drive: 1
    },
    {
        key: '1',
        upc: '884116361982',
        item_name: 'Dell Pavilion',
        ram:[4,4],
        m2:{
            sata:512,
            pcie:true,
            nvme:true
        },
        hard_drive: 1
      },
    {
        key: '2',
        upc: '884116361992',
        item_name: 'Dell Pavilion',
        ram:[4,4],
        m2:{
            sata:512,
            pcie:true,
            nvme:true
        },
        hard_drive: 1
      },
    
    
    // {
    //   key: '3',
    //   item_name: 'Dell inspiron',
    //   upc: '19255825525',
    //   ram: 8,
    //   ram_slot:2,
    //   hard_drive: '512',
    // },
    // {
    //   key: '4',
    //   item_name: 'Lenovo thinkpad',
    //   upc: '19255825525',
    //   ram: 4,
    //   ram_slot: 2,
    //   hard_drive: 512,
    // },
    // {
    //   key: '1',
    //   item_name: 'HP x360',
    //   upc: '19255825525',
    //   ram: 32,
    //   ram_slot:2,
    //   hard_drive: 1,
    // },
    // {
    //   key: '2',
    //   item_name: 'HP x360 envy',
    //   upc: '19255825525',
    //   ram: 16,
    //   ram_slot:2,
    //   hard_drive: 1024,
    // },
    // {
    //   key: '3',
    //   item_name: 'Dell inspiron',
    //   upc: '19255825525',
    //   ram: 8,
    //   ram_slot:2,
    //   hard_drive: '512',
    // },
    // {
    //   key: '4',
    //   item_name: 'Lenovo thinkpad',
    //   upc: '19255825525',
    //   ram: 4,
    //   ram_slot: 2,
    //   hard_drive: 512,
    // },
    // {
    //   key: '1',
    //   item_name: 'HP x360',
    //   upc: '19255825525',
    //   ram: 32,
    //   ram_slot:2,
    //   hard_drive: 1,
    // },
    // {
    //   key: '2',
    //   item_name: 'HP x360 envy',
    //   upc: '19255825525',
    //   ram: 16,
    //   ram_slot:2,
    //   hard_drive: 1024,
    // },
    // {
    //   key: '3',
    //   item_name: 'Dell inspiron',
    //   upc: '19255825525',
    //   ram: 8,
    //   ram_slot:2,
    //   hard_drive: '512',
    // },
    // {
    //   key: '4',
    //   item_name: 'Lenovo thinkpad',
    //   upc: '19255825525',
    //   ram: 4,
    //   ram_slot: 2,
    //   hard_drive: 512,
    // },
    // {
    //   key: '1',
    //   item_name: 'HP x360',
    //   upc: '19255825525',
    //   ram: 32,
    //   ram_slot:2,
    //   hard_drive: 1,
    // },
    // {
    //   key: '2',
    //   item_name: 'HP x360 envy',
    //   upc: '19255825525',
    //   ram: 16,
    //   ram_slot:2,
    //   hard_drive: 1024,
    // },
    // {
    //   key: '3',
    //   item_name: 'Dell inspiron',
    //   upc: '19255825525',
    //   ram: 8,
    //   ram_slot:2,
    //   hard_drive: '512',
    // },
    // {
    //   key: '4',
    //   item_name: 'Lenovo thinkpad',
    // //   upc: '19255825525',
    //   ram: 4,
    //   ram_slot: 2,
    //   hard_drive: 512,
    // },
  ];

  const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
  );
  
  export {
      data,
      content,
  }