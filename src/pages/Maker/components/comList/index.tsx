import React, { useCallback } from 'react'
import update from 'immutability-helper'
import { ICardProps } from '../preview'
import './index.less'
import { Thumbnail } from './Thumbnail'

const index = (props: ICardProps) => {
  const { cards, setCards } = props

  return (
    <div className="com-list">
      <div className="com-item">
        <Thumbnail
          item={{
            id: '8', 
            type: 'title',
            text: '标题文本',
            icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FjAs6eTmbK_4lQRI3GYXu97Fj_B_.png'
          }}
        />
      </div>
      <div className="com-item">
        <Thumbnail
          item={{
            id: '9', 
            type: 'search',
            text: '商品搜索',
            icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FsW9Sbp2UH3-1suib4UB-RwyaR3y.png'
          }}
        />
      </div>
      <div className="com-item">
        <Thumbnail
          item={{
            id: '10', 
            type: 'notice',
            text: '公告',
            icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FlcvwSqlns7YVxDk8Zi2yAG6oEji.png'
          }}
        />
      </div>
    </div>
  )
}
export default index