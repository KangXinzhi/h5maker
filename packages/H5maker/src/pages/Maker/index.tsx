import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import TopBar from './components/topBar'
import ComList from './components/comList'
import Editor from './components/editor';
import Preview from './components/preview';

import { db } from '../../db';
import './index.less'

const Maker: React.FC = () => {
  const [cards, setCards] = useState([])
  const [showIframe, setShowIframe] = useState(true)
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件
  const {id} = useParams()
  const shopId = id && +id
  const shopSchema = useLiveQuery(
    ()=> db.ShopList?.get(shopId)
  );

  //监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards } = data;
      setCompActiveIndex(compActiveIndex);
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow.postMessage(cards, 'http://localhost:3007/#/preview');
    }
  }, [cards])

  useEffect(()=>{
    setCards(shopSchema?.schema||[])
  },[shopSchema?.title])

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar cards={cards}/>
        <ComList setShowIframe={setShowIframe} />
        <Preview compActiveIndex={compActiveIndex} showIframe={showIframe} cards={cards} setCards={setCards} />
        <Editor cards={cards} setCards={setCards} compActiveIndex={compActiveIndex} />
      </DndProvider>
    </div>
  )
}

export default Maker

