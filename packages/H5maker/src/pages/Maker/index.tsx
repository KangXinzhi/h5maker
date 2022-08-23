import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './index.less'
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TopBar from './components/topBar'
import ComList from './components/comList'
import Editor from './components/editor';
import Preview from './components/preview';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Maker: React.FC = () => {
  const ITEMS = [
    {
      id: 9,
      text: '标题文本',
      name: "titleText",
      config: [
        {
          label: "标题内容",
          type: "input",
          format: "title",
          value: '1'
        },
        {
          label: "描述内容",
          type: "textarea",
          format: "content",
          value: '1'
        },
        {
          label: "显示位置",
          type: "legend-style-line",
          format: "position",
          config: {
            icon: '#icon-alignleft',
            style: {
              justifyContent: 'left',
            },
            tooltip: '居左显示',
          },
          configOptions: [
            {
              icon: '#icon-alignleft',
              style: {
                justifyContent: 'left',
              },
              tooltip: '居左显示',
            }, 
            {
              icon: '#icon-aligncenter',
              style: {
                justifyContent: 'center',
              },
              tooltip: '居中显示',
            }
          ]
        },
        {
          label: "标题大小",
          type: "legend-style-line",
          format: "title-size",
          config: {
            icon: '#icon-alignleft',
            style: {
              fontSize: '16px',
            },
            tooltip: '大(16)号',
          },
          configOptions: [
            {
              icon: '#icon-font-16',
              style: {
                fontSize: '16px',
              },
              tooltip: '大(16)号',
            }, 
            {
              icon: '#icon-font-14',
              style: {
                fontSize: '14px',
              },
              tooltip: '中(14)号',
            }, 
            {
              icon: '#icon-font-12',
              style: {
                fontSize: '12px',
              },
              tooltip: '小(12)号',
            }
          ]
        },
        {
          label: "描述大小",
          type: "legend-style-line",
          format: "content-size",
          config: {
            icon: '#icon-font-12',
            style: {
              fontSize: '12px',
            },
            tooltip: '小(12)号',
          },
          configOptions: [
            {
              icon: '#icon-font-16',
              style: {
                fontSize: '16px',
              },
              tooltip: '大(16)号',
            }, 
            {
              icon: '#icon-font-14',
              style: {
                fontSize: '14px',
              },
              tooltip: '中(14)号',
            }, 
            {
              icon: '#icon-font-12',
              style: {
                fontSize: '12px',
              },
              tooltip: '小(12)号',
            }
          ]
        },
      ],
    }
  ]
  const [cards, setCards] = useState(ITEMS)
  const [showIframe, setShowIframe] = useState(true)
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件

  //监听iframe 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards } = data;
      setCompActiveIndex(compActiveIndex);
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow.postMessage(cards, 'http://localhost:3007/#/preview');
    }
  }, [cards])

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <ComList setShowIframe={setShowIframe} />
        <Preview compActiveIndex={compActiveIndex} showIframe={showIframe} cards={cards} setCards={setCards} />
        <Editor cards={cards} setCards={setCards} compActiveIndex={compActiveIndex} />
      </DndProvider>
    </div>
  )
}

export default Maker

