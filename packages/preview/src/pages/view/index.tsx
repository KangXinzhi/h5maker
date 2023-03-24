import React, { useEffect, useState } from "react";
import { PreviewHeader } from "../../components/previewHeader";
import { PreviewFooter } from "../../components/previewFooter";

import "./index.css";
import { ViewCard } from "../../components/viewCard";

const View = () => {
  const [cards, setCards] = useState([]); // all component

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
