import { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(-1); // current component

  return (
    <div className='preview'>
      <DndProvider backend={HTML5Backend}>
        <div className="content">
          {cards.map((card, index) => (
            <Card
              currentIndex={currentIndex}
              key={card.id + '--' + index}
              IDkey={card.id + '--' + index}
              item={card}
              index={index}
              cards={cards}
              setCards={setCards}
              setCurrentIndex={setCurrentIndex}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default PreView;
