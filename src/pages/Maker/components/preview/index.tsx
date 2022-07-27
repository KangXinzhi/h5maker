import { Button } from 'antd'
import React from 'react'
import { Card } from './Card'
import './index.less'

export interface ICardProps {
  cards: {
    id: number;
    text: string;
  }[]
  setCards: React.Dispatch<React.SetStateAction<{
    id: number;
    text: string;
  }[]>>
}

const index = (props: ICardProps) => {
  const {cards, setCards} = props
  return (
    <div className='preview-wrap'>
      <div className='tool-bar'>
        <div className='btn'>页面设置</div>
        <div className='btn'>组件管理</div>
        <div className='btn'>历史记录</div>
      </div>
      <div className='preview'>
        <div className="content">
          {cards.map((card, index) => (
            <Card
              key={card.id + '-' + index}
              IDkey={card.id + '-' + index}
              item={card}
              index={index}
              cards={cards}
              setCards={setCards}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default index