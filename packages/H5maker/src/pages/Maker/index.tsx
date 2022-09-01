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
import { IComponentItemProps } from './components/comList/schema';

const Maker: React.FC = () => {
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;
  const [cards, setCards] = useState<IComponentItemProps[] | []>([])
  const [scrollY, setScrollY] = useState(0)
  const [showIframe, setShowIframe] = useState(true)
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件
  const { id } = useParams()
  const shopId = id && +id
  const shopSchema = useLiveQuery(
    () => db.ShopList?.get(shopId)
  );

  //监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards, scrollY } = data;
      compActiveIndex != null && setCompActiveIndex(compActiveIndex);
      cards && setCards(cards);
      scrollY != null && setScrollY(scrollY)
    });
  }, []);

  useEffect(() => {
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow!.postMessage({ cards, compActiveIndex }, 'http://localhost:3007/#/preview');
    }
  }, [cards, compActiveIndex])

  useEffect(() => {
    if (!shopSchema?.schema) return
    setCards(shopSchema.schema)

    // 初始化获取数据后，向 preview 同步一次数据
    if (iFrame && iFrame.contentWindow) {
      setTimeout(() => {
        iFrame.contentWindow!.postMessage({ cards: shopSchema?.schema }, 'http://localhost:3007/#/preview');
      }, 1000)
    }
  }, [shopSchema])

  console.log('compActiveIndex', compActiveIndex)

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar cards={cards} />
        <ComList setShowIframe={setShowIframe} />
        <Preview scrollY={scrollY} compActiveIndex={compActiveIndex} showIframe={showIframe} cards={cards} setCards={setCards} setCompActiveIndex={setCompActiveIndex} />
        <Editor cards={cards} setCards={setCards} compActiveIndex={compActiveIndex} />
      </DndProvider>
    </div>
  )
}

export default Maker

