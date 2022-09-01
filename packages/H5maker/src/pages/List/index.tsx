import React from 'react';
import { Table, Space, Button, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { db } from '../../db';
import './index.less'


interface DataType {
  id: number;
  title: string;
  state: string;
  createTime: Date;
  memo: string;
}

const List: React.FC = () => {
  let navigate = useNavigate();

  const deleteShop = async (id: number) => {
    const res = await db.ShopList?.delete(id);
    if (!res) {
      message.success('删除成功！')
    } else {
      message.error('删除失败！')
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: text => <span>{text === 'normal' && '正常'}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '备注',
      dataIndex: 'memo',
    },
    {
      title: '操作',
      dataIndex: 'memo',
      render: (_, record) => {
        return (
          <>
            <Button
              type='primary'
              style={{ marginRight: '12px' }}
              onClick={() => {
                navigate(`/shop/edit/${record.id}`)
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                deleteShop(record.id)
              }}
            >
              删除
            </Button>
          </>
        )
      }
    }
  ];

  const shopList = useLiveQuery(
    () => db.ShopList?.toArray()
  );

  const addShop = async () => {
    const id = await db.ShopList?.put({
      title: '未命名',
      state: 'normal',
      createTime: new Date(),
      memo: '',
      schema: [],
    });
    console.log('id', id)
    navigate(`/shop/edit/${id}`)
    // const res = await db.ShopList?.update(2, { "title" : "12131231"})
    // console.log(res)
  }



  console.log('shopList', shopList)
  return (
    <div className='container'>
      <Button
        type="primary"
        style={{
          marginBottom: '16px'
        }}
        onClick={addShop}>
        新建
      </Button>
      <Table bordered columns={columns} dataSource={shopList} />
    </div>
  )
}

export default List

