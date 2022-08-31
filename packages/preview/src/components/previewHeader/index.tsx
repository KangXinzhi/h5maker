import { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import classnames from 'classnames'

import './index.less'

export interface IHeaderProps {

}



export const PreviewHeader: FC<IHeaderProps> = () => {

  return (
    <div className='preview-header-container'>
      <div className='header'>
        {dayjs(new Date()).format('HH:mm')}
        <div className="other">
          <img src='https://img01.yzcdn.cn/upload_files/2021/08/26/FpfuSKwUL6dwuVFu8bTJtXNyFJFc.png' />
          <img src='https://img01.yzcdn.cn/upload_files/2021/08/26/Fp2VBx2V2U6iDWyoqsNe0MTXym7Z.png' />
          <img src='https://img01.yzcdn.cn/upload_files/2021/08/26/FggIMQbJb4OxvAhxePe_QkmVQj2j.png' />
        </div>
      </div>
      <div className="title">
        <div>
          微页面标题
        </div>
        <div className="right">
          <div className="menu" />
          <div className="split-line" />
          <div className="dot" />
        </div>
      </div>
    </div>
  )
}
