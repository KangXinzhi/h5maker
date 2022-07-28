import React, { useEffect, useState } from 'react';
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
  const [showIframe, setShowIframe] = useState(true)
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件

  //监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex,cards } = data;
      setCompActiveIndex(compActiveIndex);
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow.postMessage(cards, 'http://localhost:3007/#/preview');
    }
  }, [cards.length])

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <ComList setShowIframe={setShowIframe} />
        <Preview compActiveIndex={compActiveIndex} showIframe={showIframe} cards={cards} setCards={setCards} />
        <Editor cards={cards} setCards={setCards} compActiveIndex={compActiveIndex} />
      </DndProvider>
    </div>
  )
}

export default Maker

