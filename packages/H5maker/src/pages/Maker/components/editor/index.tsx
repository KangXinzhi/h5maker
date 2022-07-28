import { Input } from 'antd';
import React from 'react'
import './index.less'

export interface IProps {
  cards: {
    id: number;
    text: string;
  }[]
  setCards: React.Dispatch<React.SetStateAction<{
    id: number;
    text: string;
  }[]>>
  compActiveIndex: number | null
}

const index = (props:IProps) => {
  const { cards, setCards, compActiveIndex } = props

  return (
    <div className="editor">
      {compActiveIndex!==null && (
        <>
        <h2>{cards[compActiveIndex].text}</h2>
        {cards[compActiveIndex].config.map((item,index)=>(
          item.format==='title' && (
            <>
              <h4>{item.label}</h4>
              <Input placeholder='请输入标题'/>
            </>
          )
        ))}
        </>
      )}
    </div>
  )
}

export default index