import { CSSProperties, FC, useEffect } from 'react'
import { memo } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'

export const ItemTypes = {
  CARD: 'card',
}
export interface CardProps {
  item: {
    id: string
    text: string
    icon: string
    type: string
  }
  setShowIframe: (showIframe: boolean) => void
}

export const Thumbnail: FC<CardProps> = memo((props) => {
  const { item,setShowIframe} = props
  const [{isDragging}, drag] = useDrag(
    {
      item: {comp: item, originalIndex: -1},
      type: 'comp',
      end: (item: any, monitor: DragSourceMonitor) => {
        setShowIframe(true)
        if (monitor.didDrop()) {
          item.originalIndex = -1
          // 拖拽结束&处于放置目标,先简单放到最后
          // setCards([...cards, item.comp])
        } else {
          // 拖拽结束&不处于放置目标
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [],
  );

  useEffect(()=>{
    if(isDragging){
      setShowIframe(false)
    }
  },[isDragging])

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
