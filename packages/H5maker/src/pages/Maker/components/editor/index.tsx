import { Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import classNames from 'classnames';
import React from 'react'
import { useAtom, atom } from "jotai";
import { cardsAtom, compActiveIndexAtom } from '../../../../store'

import { IComponentItemProps } from '../comList/schema';
import styles from './index.module.less'

export interface IProps {
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  compActiveIndex: number | null
}

const index = () => {
  const [cards, setCards] = useAtom(cardsAtom)
  const [compActiveIndex] = useAtom(compActiveIndexAtom)

  return (
    <div className={styles.editor}>
      {compActiveIndex != null && cards?.[compActiveIndex] && (
        <>
          <div className={styles.editor_title_3a}>{cards[compActiveIndex].text}</div>
          <div className={styles.editor_content_2f}>
            {cards[compActiveIndex].config.map((item, index) => (
              item.type === 'input' && (
                <div className={styles.item}>
                  <h4>{item.label}</h4>
                  <Input
                    placeholder='请输入内容'
                    value={cards[compActiveIndex].config[index].value}
                    onChange={(e) => {
                      const copyCards = cards.splice(0)
                      copyCards[compActiveIndex].config[index].value = e.target.value
                      setCards(copyCards)
                    }} />
                </div>
              ) ||
              item.type === 'textarea' && (
                <div className={styles.item}>
                  <h4>{item.label}</h4>
                  <TextArea
                    placeholder='请输入内容'
                    value={cards[compActiveIndex].config[index].value}
                    onChange={(e) => {
                      const copyCards = cards.splice(0)
                      copyCards[compActiveIndex].config[index].value = e.target.value
                      setCards(copyCards)
                    }} />

                </div>
              ) ||
              item.type === 'legend-style-line' && (
                <div className={styles['legend-line']}>
                  <div>
                    <span className={styles['legend-line-title']}>{item?.label || ''}</span>
                    <span className={styles['legend-line-value']}>{item?.config?.tooltip || ''}</span>
                  </div>
                  <div>
                    {
                      item?.configOptions?.length! > 0 && (
                        item.configOptions!.map((item2, index2) => (
                          <Button
                            key={`icon-${index}-${index2}`}
                            className={classNames({
                              'button-active': item?.config?.tooltip === item2.tooltip,
                            })}
                            onClick={() => {
                              const copyCards = cards.splice(0)
                              copyCards[compActiveIndex].config[index].config = item2
                              setCards(copyCards)
                            }}
                          >
                            <svg className="icon" aria-hidden="true">
                              <use xlinkHref={item2?.icon || ''}></use>
                            </svg>
                          </Button>
                        ))
                      )
                    }
                  </div>
                </div>
              ) ||
              item.type === 'image' && (
                <div className={styles.item}>
                  <h4>{item.label}</h4>
                  <TextArea
                    placeholder='请输入内容'
                    value={cards[compActiveIndex].config[index].value}
                    onChange={(e) => {
                      const copyCards = cards.splice(0)
                      copyCards[compActiveIndex].config[index].value = e.target.value
                      setCards(copyCards)
                    }}
                  />
                  <img src={cards[compActiveIndex].config[index].value} className={styles.img}/>
                </div>
              )||
              item.type === 'legend-style-shop' && (
                <div className={styles['legend-shop']}>
                  <div>
                    <span className={styles['legend-line-title']}>{item?.label || ''}</span>
                    <span className={styles['legend-line-value']}>{item?.config?.tooltip || ''}</span>
                  </div>
                  <div>
                    {
                      item?.configOptions?.length! > 0 && (
                        item.configOptions!.map((item2, index2) => (
                          <Button
                            key={`icon-${index}-${index2}`}
                            className={classNames({
                              'button-active': item?.config?.tooltip === item2.tooltip,
                            })}
                            onClick={() => {
                              const copyCards = cards.splice(0)
                              copyCards[compActiveIndex].config[index].config = item2
                              setCards(copyCards)
                            }}
                          >
                            <svg className="icon" aria-hidden="true">
                              <use xlinkHref={item2?.icon || ''}></use>
                            </svg>
                          </Button>
                        ))
                      )
                    }
                  </div>
                </div>
              ) 
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default index