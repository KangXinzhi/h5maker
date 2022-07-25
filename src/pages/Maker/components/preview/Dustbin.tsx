import { CSSProperties, FC, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { ICardProps } from '.'
import update from 'immutability-helper'
import { Card, ItemTypes } from './Card'


export const Dustbin: FC<ICardProps> = (props) => {
  const { cards, setCards } = props

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  return (
    <div className="content" ref={drop} data-testid="dustbin">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  )
}
