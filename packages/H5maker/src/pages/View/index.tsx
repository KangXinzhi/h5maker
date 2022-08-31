import React, { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../../db';
import './index.less'
import { Button } from 'antd';

const View: React.FC = () => {
  const iFrame = document.getElementById('viewIframe') as HTMLIFrameElement;
  const navigate = useNavigate();
  const { id } = useParams()
  const shopId = id && +id
  const shopSchema = useLiveQuery(
    () => db.ShopList?.get(shopId)
  );

  useEffect(() => {
    if (!shopSchema?.schema) return

    // 初始化获取数据后，向 preview 同步一次数据
    if (iFrame && iFrame.contentWindow) {
      setTimeout(() => {
        iFrame.contentWindow!.postMessage({ cards: shopSchema?.schema }, 'http://localhost:3007/#/preview');
      }, 1000)
    }
  }, [shopSchema])


  return (
    <div className='view-iframe-container'>
      <iframe
        className='view-iframe'
        src="http://localhost:3007/#/view"
        scrolling="yes"
        frameBorder="0"
        id="viewIframe"
      />
      <Button
        className='view-back'
        type="primary"
        onClick={() => {
          navigate(-1)
        }}
      >
        返回
      </Button>
    </div>
  )
}

export default View

