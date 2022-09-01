import { FC, useMemo } from 'react'
import { useRef } from 'react'
import classnames from 'classnames'
import './index.less'

export interface IComponentItemProps {
  text: string  // 组件区中组件的名称
  name: string  // 组件区中组件的的key
  icon: string  // 组件区中组件的icon地址
  config: {
    label: string   // 配置区中title名称
    type: string  // 配置区组件类型
    format: string
    value?: string
    config?: {  // 默认配置项
      icon: string
      style: React.CSSProperties
      tooltip: string,
    }
    configOptions?: {  // 配置区中组件配置列表
      icon: string
      style: React.CSSProperties
      tooltip: string,
    }[]
  }[]
}

export interface CardProps {
  item: IComponentItemProps
  index: number
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  IDkey: string
}

export const ViewCard: FC<CardProps> = ({ item, IDkey, cards, index, setCards }) => {
  const ref = useRef<HTMLDivElement>(null)

  const titleTextStyle = useMemo(() => {
    let result = {}

    if (item.name === 'titleText') {
      item?.config.forEach((_item: any) => {
        if (_item.config) {
          result[_item.format] = _item.config.style
        }
      })
    }

    return result
  }, [item])

  return (
    <div
      ref={ref}
      className={classnames('card3-container')}
    >
      {item.name === 'titleText' && item?.config.map((item2, index2) => {
        return (
          <div
            key={`titleText-${index2}`}
            className='title-text-container'
            style={titleTextStyle['position']}
          >
            {item2.type === 'input' && (<span className='title-text' style={titleTextStyle['title-size']}>{item2.value}</span>)}
            {item2.type === 'textarea' && (<span className='content-text' style={titleTextStyle['content-size']}>{item2.value}</span>)}
          </div>
        )
      })}
    </div>
  )
}
