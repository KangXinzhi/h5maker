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
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Maker: React.FC = () => {
  const ITEMS = [
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 3,
      text: 'Create some examples',
    }
  ]
  const [cards, setCards] = useState(ITEMS)
  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <ComList/>
        <Preview cards={cards} setCards={setCards} />
        <Editor />
      </DndProvider>
    </div>
  )
}

export default Maker

