import { Button } from 'antd'
import React from 'react'
import './index.less'
const index = () => {
  return (
    <div className='preview-wrap'>
      <div className='tool-bar'>
        <div className='btn'>页面设置</div>
        <div className='btn'>组件管理</div>
        <div className='btn'>历史记录</div>
      </div>
      <div className='preview'>
        <div className='content'>
          2
        </div>
      </div>
    </div>
  )
}
export default index