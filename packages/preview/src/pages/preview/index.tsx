import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { useUpdateEffect } from "ahooks";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from "./components/card";
import { PreviewHeader } from "./components/previewHeader";
import { PreviewFooter } from "./components/previewFooter";

import "./index.css";

const PreView = () => {
  const [cards, setCards] = useState([]); // all component
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件

  useUpdateEffect(() => {
    window.parent.postMessage({ compActiveIndex: compActiveIndex, cards: cards }, "*");
  }, [compActiveIndex])

  //监听父页面 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === 'http://localhost:3000') {
        const { compActiveIndex, cards } = e.data;
        compActiveIndex !== null && setCompActiveIndex(compActiveIndex);
        cards && setCards(cards);
      }
    });
  }, [])

  return (
    <div className='preview'>
      <div className="content">
        <PreviewHeader />
        <div className="main">
          <DndProvider backend={HTML5Backend}>

            {cards.map((card, index) => (
              <Card
                key={`card-${index}`}
                IDkey={`card-${index}`}
                item={card}
                index={index}
                cards={cards}
                setCards={setCards}
                compActiveIndex={compActiveIndex}
                setCompActiveIndex={setCompActiveIndex}
              />
            ))}
          </DndProvider>
        </div>
        <PreviewFooter />
      </div>
    </div>
  );
};

export default PreView;
