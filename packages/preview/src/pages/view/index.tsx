import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { useUpdateEffect } from "ahooks";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from "../../components/card";
import { PreviewHeader } from "../../components/previewHeader";
import { PreviewFooter } from "../../components/previewFooter";

import "./index.css";
import { ViewCard } from "../../components/viewCard";

const View = () => {
  const [cards, setCards] = useState([]); // all component
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件


  //监听父页面 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === 'http://localhost:3000') {
        const { cards } = e.data;
        cards && setCards(cards);
      }
    });
  }, [])

  return (
    <div className='view'>
      <div className="content">
        <PreviewHeader />
        <div className="main">
          {cards.map((card, index) => (
            <ViewCard
              key={`card-${index}`}
              IDkey={`card-${index}`}
              item={card}
              index={index}
              cards={cards}
              setCards={setCards}
            />
          ))}
        </div>
        <PreviewFooter />
      </div>
    </div>
  );
};

export default View;
