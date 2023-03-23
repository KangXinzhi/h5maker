import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAtom, atom } from "jotai";
import { cardsAtom, scrollYAtom, compActiveIndexAtom, showIframeAtom } from '../../store'

import TopBar from './components/topBar'
import ComList from './components/comList'
import Editor from './components/editor';
import Preview from './components/preview';

import { db } from '../../db';
import './index.less'
import { IComponentItemProps } from './components/comList/schema';

const Maker: React.FC = () => {
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;

  const [cards, setCards] = useAtom(cardsAtom)
  const [, setScrollY] = useAtom(scrollYAtom)
  const [, setShowIframe] = useAtom(showIframeAtom)
  const [compActiveIndex, setCompActiveIndex] = useAtom(compActiveIndexAtom)


  const { id } = useParams()
  const shopId = id && +id
  const shopSchema = useLiveQuery(
    () => db.ShopList?.get(shopId)
  )

  //监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards, scrollY } = data;
      compActiveIndex != null && setCompActiveIndex(compActiveIndex);
      cards && setCards(cards);
      scrollY != null && setScrollY(scrollY)
    })
  }, [])

  useEffect(() => {
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow!.postMessage({ cards, compActiveIndex }, 'http://localhost:3007/preview');
    }
  }, [cards, compActiveIndex])

  useEffect(() => {
    if (!shopSchema?.schema) return
    setCards(shopSchema.schema)

    // 初始化获取数据后，向 preview 同步一次数据
    if (iFrame && iFrame.contentWindow) {
      setTimeout(() => {
        iFrame.contentWindow!.postMessage({ cards: shopSchema?.schema }, 'http://localhost:3007/preview');
      }, 1000)
    }
  }, [shopSchema])

  console.log('compActiveIndex', compActiveIndex)

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <ComList setShowIframe={setShowIframe} />
        <Preview />
        <Editor />
      </DndProvider>
    </div>
  )
}

export default Maker

