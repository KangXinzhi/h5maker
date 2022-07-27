import { Button } from 'antd'
import React from 'react'
import './index.less'

const index = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-back">返回微页面</div>
      <div className="decorate-action">
        <Button>预览</Button>
        <Button style={{margin:'0 16px'}}>保存</Button>
        <Button type="primary">下载</Button>
      </div>
    </div>
  )
}

export default index