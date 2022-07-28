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
      {compActiveIndex!==null && cards[compActiveIndex].text}
    </div>
  )
}

export default index