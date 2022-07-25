import { Button } from 'antd'
import React from 'react'
import { Dustbin } from './Dustbin'
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
  return (
    <div className='preview-wrap'>
      <div className='tool-bar'>
        <div className='btn'>页面设置</div>
        <div className='btn'>组件管理</div>
        <div className='btn'>历史记录</div>
      </div>
      <div className='preview'>
        <Dustbin cards={props.cards} setCards={props.setCards} />
      </div>
    </div>
  )
}
export default index