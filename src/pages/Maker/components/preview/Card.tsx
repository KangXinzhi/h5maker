import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  item: {
    id: number;
    text: string;
  }
  index: number
  cards: {
    id: number;
    text: string;
  }[]
  setCards: any
  IDkey: string
}

export interface Item {
  id: number
  text: string
}

interface DragItem {
  originalIndex: number
  comp: Item
}

export const Card: FC<CardProps> = ({ item, IDkey,cards, index, setCards }) => {
  const { id, text } = item
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
      const dragIndex = item.originalIndex
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if(item.originalIndex!==-1){
        setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
          }),
        )
      }else{
        setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [hoverIndex, 0, item.comp],
          ],
          }),
        )
      }
    

      item.originalIndex = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'comp',
    item: () => {
      return {comp: item, originalIndex: index}
    },
    isDragging: (monitor) => {
      return monitor.getItem().comp.id+'-'+monitor.getItem().originalIndex === IDkey
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
   
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  )
}