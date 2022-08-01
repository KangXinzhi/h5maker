import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from "./components/card";
import "./index.css";

let id = 0;
const ITEMS = [
  {
    id: 9,
    text: '标题文本',
    name: "titleText",
    config: [
      {
        label: "标题内容",
        type: "input",
        format: "title",
        value:'1'
      },
      {
        label: "描述内容",
        type: "textarea",
        format: "content",
        value:'1'
      },
      {
        label: "显示位置",
        type: "legend-style-line",
        format: "position",
        config: {
          icon: '#icon-alignleft',
          style: {
            justifyContent: 'left',
          },
          tooltip: '居左显示',
        },
        configOptions: [
          {
            icon: '#icon-alignleft',
            style: {
              justifyContent: 'left',
            },
            tooltip: '居左显示',
          },{
            icon: '#icon-aligncenter',
            style: {
              justifyContent: 'center',
            },
            tooltip: '居中显示',
          }
        ]
      },
      {
        label: "标题大小",
        type: "legend-style-line",
        format: "title-size",
        config: {
          icon: '#icon-alignleft',
          style: {
            fontSize: '16px',
          },
          tooltip: '大(16)号',
        },
        configOptions: [
          {
            icon: '#icon-font-16',
            style: {
              fontSize: '16px',
            },
            tooltip: '大(16)号',
          },{
            icon: '#icon-font-14',
            style: {
              fontSize: '14px',
            },
            tooltip: '中(14)号',
          },{
            icon: '#icon-font-12',
            style: {
              fontSize: '12px',
            },
            tooltip: '小(12)号',
          }
        ]
      },
      {
        label: "描述大小",
        type: "legend-style-line",
        format: "content-size",
        config: {
          icon: '#icon-font-12',
          style: {
            fontSize: '12px',
          },
          tooltip: '小(12)号',
        },
        configOptions: [
          {
            icon: '#icon-font-16',
            style: {
              fontSize: '16px',
            },
            tooltip: '大(16)号',
          },{
            icon: '#icon-font-14',
            style: {
              fontSize: '14px',
            },
            tooltip: '中(14)号',
          },{
            icon: '#icon-font-12',
            style: {
              fontSize: '12px',
            },
            tooltip: '小(12)号',
          }
        ]
      },
    ],
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
          console.log('data',e.data)
          setCards(e.data)
      }
      });
    }, []);

  
  console.log(cards)
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
