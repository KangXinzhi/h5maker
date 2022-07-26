import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'

export const ItemTypes = {
  CARD: 'card',
}


const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  item: {
    id: string
    text: string
    icon: string
    type: string
  }
}

export const Thumbnail: FC<CardProps> = memo((props) => {
  const { item,} = props
  const [, drag] = useDrag(
    {
      item: {comp: item, originalIndex: -1},
      type: 'comp',
      end: (item, monitor: DragSourceMonitor) => {

        if (monitor.didDrop()) {
          // 拖拽结束&处于放置目标,先简单放到最后
          // setCards([...cards, item.comp])
        } else {
          // 拖拽结束&不处于放置目标
        }

      },
    },
    [],
  );


  return (
    <div ref={drag} className='thumb-container'>
      <i 
        className="com-item__icon" 
        style={{
          backgroundImage: `url(${item.icon})`,
        }}
      />
      <span>
        {item.text}
      </span>
    </div>
  );
})
