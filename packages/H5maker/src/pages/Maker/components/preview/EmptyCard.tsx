import type { Identifier, XYCoord } from 'dnd-core'
import { FC, useMemo } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'
import classnames from 'classnames'

export interface EmptyCardProps {
  cards: {
    id: number;
    text: string;
  }[]
  setCards: any
}

interface Item {
  id: number
  text: string
}

interface DragItem {
  originalIndex: number
  comp: Item
}

export const EmptyCard: FC<EmptyCardProps> = ({ cards, setCards }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'comp',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [0, 0, item.comp],
          ],
        }),
      )
    },
  })

  const [, drag] = useDrag({
    type: 'comp',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={classnames('empty-card-container')}
      data-handler-id={handlerId}
    >
      组件放置区
    </div>
  )
}
