import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './index.less'
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate  } from 'react-router-dom'
// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: text => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map(tag => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];


const List: React.FC = () => {
  let navigate  = useNavigate ();
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [status, setStatus] = useState("");
  
  // const friends = useLiveQuery(
  //   () => db.ShopList?.toArray()
  // );

  // const addFriend = async () => {
  //   const id = await db.ShopList?.add({
  //     name,
  //     age
  //   });

  //   setStatus(`Friend ${name} successfully added. Got id ${id}`);
  //   setName("");
  //   setAge(1);
  // }

  return (
    <div className='container'>
      <Button type="primary" onClick={
        ()=>navigate('/shop/create')
      }>新建</Button>
      {/* <Table columns={columns} dataSource={data} /> */}
      {/* <p>
        {status}
      </p>
      Name:
      <input
        type="text"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={ev => setAge(Number(ev.target.value))}
      />

      <button onClick={addFriend}>
        Add
      </button> */}
    </div>
  )
}

export default List

