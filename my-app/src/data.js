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
        ram:[8,4],
        m2:{
            sata:512,
            pcie:true,
            nvme:true
        },
        hard_drive:{
            hdd:1,
            ssd:false
        },
        onboard:{
            ram:0,
            hard_drive:0
        }
    },
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