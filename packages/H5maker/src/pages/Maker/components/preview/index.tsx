import { Button } from 'antd'
import React, { useEffect } from 'react'
import { IComponentItemProps } from '../comList/schema'
import { PreviewFooter } from '../previewFooter'
import { PreviewHeader } from '../previewHeader'
import { Card } from './Card'
import { EmptyCard } from './EmptyCard'
import './index.less'

export interface ICardProps {
  scrollY: number
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  showIframe: boolean
  compActiveIndex: number | null
  setCompActiveIndex: (compActiveIndex: number) => void
}

const index = (props: ICardProps) => {
  const { cards, setCards, showIframe = true, compActiveIndex, setCompActiveIndex, scrollY } = props

  // useEffect(() => {
  //   //@ts-ignore
  //   document.querySelector('.preview').style.top = `${-scrollY + 56 + 16}px`;
  // }, [scrollY])

  console.log('scrollY', scrollY)
  return (
    <div className='preview-wrap'>
      <div className='tool-bar'>
        <div className='btn'>页面设置</div>
        <div className='btn'>组件管理</div>
        <div className='btn'>历史记录</div>
      </div>
      <iframe
        className='preview-iframe'
        src="http://localhost:3007/preview"
        scrolling="yes"
        frameBorder="0"
        id="previewIframe"
        style={{ visibility: showIframe ? 'visible' : 'hidden' }}
      />
      <div
        className='clone-iframe'
        style={{
          visibility: !showIframe ? 'visible' : 'hidden',
          top: -(scrollY ?? 0) + 56 + 16 + 'px'
        }}
      >
        <div className="content">
          <PreviewHeader />
          <div className="main">
            {cards?.length > 0 ? cards.map((card, index) => (
              <Card
                key={`card-${index}`}
                IDkey={`card-${index}`}
                item={card}
                index={index}
                cards={cards}
                setCards={setCards}
                compActiveIndex={compActiveIndex}
                setCompActiveIndex={setCompActiveIndex}
              />
            )) : (
              <EmptyCard
                cards={cards}
                setCards={setCards}
                setCompActiveIndex={setCompActiveIndex}
              />
            )}
          </div>
          <PreviewFooter />
        </div>
      </div>
    </div>
  )
}
export default index