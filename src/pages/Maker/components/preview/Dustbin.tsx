import { CSSProperties, FC, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { ICardProps } from '.'
import { Card } from './Card'


export const Dustbin: FC<ICardProps> = (props) => {
  const { cards, setCards } = props

  return (
    <div className="content">
      {cards.map((card,index) => (
        <Card
          key={card.id+'-'+index}
          IDkey={card.id+'-'+index}
          item={card}
          index={index}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  )
}
