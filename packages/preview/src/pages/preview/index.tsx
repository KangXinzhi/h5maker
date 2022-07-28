import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from "./components/card";
import "./index.css";

let id = 0;
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
const PreView = () => {
  const [cards, setCards] = useState(ITEMS); // all component
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件

  console.log(compActiveIndex)

  useEffect(()=>{
    window.parent.postMessage({ compActiveIndex: compActiveIndex, cards: cards }, "*");
  },[compActiveIndex])

  
    //监听父页面 传过来的postmessage
    useEffect(() => {
      window.addEventListener('message', (e) => {
        if(e.origin==='http://localhost:3000'){
          setCards(e.data)
      }
      });
    }, []);


  return (
    <div className='preview'>
      <DndProvider backend={HTML5Backend}>
        <div className="content">
          {cards.map((card, index) => (
            <Card
              key={card.id + '--' + index}
              IDkey={card.id + '--' + index}
              item={card}
              index={index}
              cards={cards}
              setCards={setCards}
              compActiveIndex={compActiveIndex}
              setCompActiveIndex={setCompActiveIndex}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default PreView;
