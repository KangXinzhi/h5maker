import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './index.less'
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TopBar from './components/topBar'
import ComList from './components/comList'
import Editor from './components/editor';
import Preview from './components/preview';

const Maker: React.FC = () => {
  
  return (
    <div className='container'>
      <TopBar/>
      <ComList/>
      <Preview/>
      <Editor/>
    </div>
  )
}

export default Maker

