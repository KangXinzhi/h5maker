import React, { useCallback } from 'react'
import update from 'immutability-helper'
import { ICardProps } from '../preview'
import './index.less'
import { Thumbnail } from './Thumbnail'
import { componentList } from './schema'

const index = (props: { setShowIframe: (showIframe: boolean) => void }) => {

  return (
    <div className="com-list">
      {
        componentList.map(item => (
          <div className="com-item">
            <Thumbnail
              item={item}
              setShowIframe={props.setShowIframe}
            />
          </div>

        ))
      }
    </div>
  )
}
export default index