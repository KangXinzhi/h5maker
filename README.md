# 仿[有赞](https://account.youzan.com/)店铺的低代码平台开发

## 前言
前一段时间一直对低代码平台比较感兴趣，在掘金上也看到了很多优秀的低代码平台文章分享，自己尝试仿[有赞](https://www.youzan.com/v4/shop/setting/shop-info#/)的低代码平台开发了此项目，实现了低代码平台的基本功能。  
先来看下我们的设计稿**有赞**页面：  
![动画3.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09fd5411f03d4c85afc2b08a0f462189~tplv-k3u1fbpfcp-watermark.image?)
项目最终实现效果：
![动画6.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99aa2cd23d4a4bc8bf071c929401ba9d~tplv-k3u1fbpfcp-watermark.image?)
## 一. 项目设计
### 1.1 布局
- 店铺列表页布局：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88a7cb6682e2437e90b262828e9361b5~tplv-k3u1fbpfcp-watermark.image?)

- 生成器页面布局：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2e0f088f25e41678e564f7107dbb401~tplv-k3u1fbpfcp-watermark.image?)

### 1.2 功能
- 从组件区拖拽组件，拖拽到预览区域，
- 选中预览区域的组件可以在配置区进行样式配置
- 预览区域的组件可以进行拖拽排序
- 点击头部预览按钮可以进行预览
- 保存按钮保存数据
- 预览按钮预览店铺

### 1.3 项目设计
- 参考有赞预览区设计，发现其内部使用的是iframe，预览区设计成单独的iframe的方式显示，这样的好处：方便预览,节省代码，不然要实现两边展示区的逻辑
- 项目分为两个系统，预览区iframe系统和编辑器系统
- 数据库采用浏览器的indexDB，配套的三方库采用[Dexie](https://dexie.org/)
- 项目难点：跨 iframe 拖拽，一些拖拽组件如react-dnd react-beautiful-dnd 都无法实现，参考了掘金上的一些文章，转转团队它们因react-dnd不支持跨iframe便放弃了，自己使用原生H5的拖拽事件封装一个。我的设计思路：数据驱动视图，可以在拖动时显示一个和iframe样式相同的盒子，来模拟iframe进行拖拽，因为在同一组件中并未设计到跨iframe并不会有任何问题，可以使用任何方式完成如react-dnd，只需拖拽结束后同步数据，传给iframe，iframe接收到数据后进行显示
- 跨 Iframe 通信，采用 postMessage 通信
### 1.4 组件区schema定义
```
// 类型定义
{
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

// 实际应用(标题)
{
    text: '标题文本',
    name: "titleText",
    icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FjAs6eTmbK_4lQRI3GYXu97Fj_B_.png',
    config: [
      {
        label: "标题内容",
        type: "input",
        format: "title",
        value: '请输入文本内容'
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
    ],
  }
```

### 1.5 数据库设计

数据库：myDatabase
表：ShopList
属性：
|  id   | title  | state  | createTime  | memo  | schema  |
|  ----  | ----  | ----  | ----  | ----  | ----  |
| 自增  | 标题 | 状态 | 创建时间 | 备注 | schema |


对应的 db.js文件
```
import Dexie from 'dexie';

export const db: any = new Dexie('myDatabase');
db.version(1).stores({
  ShopList: '++id, title, state, createTime, memo, schema',
});
```

## 二. 开发初探
### 2.1 创建项目
项目分为两个项目，所以在packages创建两个项目  
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a54585874c804f01b2215dbea740a913~tplv-k3u1fbpfcp-watermark.image?)  

- H5make项目为主项目（端口3000），有两个页面，列表页面和生成器页面   
- preview是预览项目（端口3007），使用ifrmae的方式嵌套到H5maker中
- 直接用yarn create vite 生成react项目


### 2.2 列表页开发和数据库配置
header区有一个新建按钮，内容区一个table表格，直接使用antd组件库来绘制基本页面     
数据源来自浏览器自带的indexDB数据库  
数据库采用浏览器的indexDB，配套的三方库采用[Dexie](https://dexie.org/)    
生成db.js文件
```
import Dexie from 'dexie';

export const db: any = new Dexie('myDatabase');
db.version(1).stores({
  ShopList: '++id, title, state, createTime, memo, schema',
});
```
直接可以在项目中使用useLiveQuery请求indexDB数据库中的数据
```
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';

const shopList = useLiveQuery(
  () => db.ShopList?.toArray()
);
```
使用向数据库中添加数据
```
import { db } from '../../db';

await db.ShopList?.put({
  title: '未命名',
  state: 'normal',
  createTime: new Date(),
  memo: '',
  schema: [],
});
```

最终生成的pages下的list文件：
```
import React from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { db } from '../../db';
import './index.less'

interface DataType {
  id: number;
  title: string;
  state: string;
  createTime: Date;
  memo: string;
}

const List: React.FC = () => {
  let navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: text => <span>{text==='normal'&&'正常'}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time) => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '备注',
      dataIndex: 'memo',
    },
    {
      title: '操作',
      dataIndex: 'memo',
      render: (_, record)=>{
        return (
          <>
            <Button 
              type='primary' 
              style={{marginRight:'12px'}}
              onClick={()=> {
                navigate(`/shop/edit/${record.id}`)
              }}
            >编辑</Button>
            <Button>删除</Button>
          </>
        )
      }
    }
  ];

  const shopList = useLiveQuery(
    () => db.ShopList?.toArray()
  );

  const addShop = async () => {
    const id = await db.ShopList?.put({
      title: '未命名',
      state: 'normal',
      createTime: new Date(),
      memo: '',
      schema: [],
    });
    navigate(`/shop/edit/${id}`)
  }

  return (
    <div className='container'>
      <Button
        type="primary"
        style={{
          marginBottom: '16px'
        }}
        onClick={addShop}>
        新建
      </Button>
      <Table bordered columns={columns} dataSource={shopList} />
    </div>
  )
}

export default List
```
效果预览：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0faf5c1e8e29468eaaea87f9ab53d5fa~tplv-k3u1fbpfcp-watermark.image?)
对应的数据库
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/110ca0e65b1541b7b32229f9b35f370f~tplv-k3u1fbpfcp-watermark.image?)

## 三. 低代码生成器页面开发
再来看下我们的设计稿有赞页面：
![动画3.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09fd5411f03d4c85afc2b08a0f462189~tplv-k3u1fbpfcp-watermark.image?)
思路分析：  
组件预览区显示的是iframe盒子：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99dc59d38abb48f18c34966d7b1625cc~tplv-k3u1fbpfcp-watermark.image?)
因为跨iframe拖拽存在很多问题，一些拖拽库都不支持跨iframe拖拽，比如react-dnd  
解决方案是：当组件拖动时，大小位置一模一样的假iframe盒子出现，真iframe隐藏，从跨页面拖拽转移到在一个页面进行拖拽，  
数据驱动视图，拖拽完成后和iframe页面同步下数据，解决react-dnd无法实现跨iframe拖拽的问题。
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bc92b9cd1a64f1b87c4ab9803390044~tplv-k3u1fbpfcp-watermark.image?)

低代码生成器页面开发流程：
- 根页面维护一个cards全局数据，存放预览区域的数据
- 进入编辑页面从数据库中读取cards数据，获取数据后用postMessage同步**两端**数据（iframe端、低代码生成器端）数据
- 左侧组件区：
    - 每个组件有自己的schema定义规则，根据schema可以在预览区预览，编辑区显示并编辑
    - 每个组件可以拖拽，用react-dnd组件库实现拖拽，拖拽时，隐藏iframe，显示模拟iframe的假盒子，因为假盒子和组件是同一个iframe的数据，可以很方便的进行拖拽
    - 拖拽结束后，postMessage同步**两端**数据，隐藏iframe假盒子，显示iframe
- iframe预览区：
    - 一个iframe页面，一个布局和iframe页面完全相同的假盒子
    - 在iframe中，可以进行拖拽排序，拖拽排序完成后，使用postMessage同步**两端**数据
- 组件配置区：预览区点击选中某一个组件时，预览区根据schema显示它的可配置项，在预览区进行配置，效果显示在预览区
- 保存按钮，将当前的cards数据，存入数据库

### 3.1 postMessage 同步两端数据
- 进入编辑页面时，在低代码端向数据库请求数据，请求到数据后同步两端数据，从低代码端发送到Iframe端
```
  // 低代码端发送
  const [cards, setCards] = useState([]); // all component
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement;
  const shopSchema = useLiveQuery(
    () => db.ShopList?.get(shopId)
  );
  useEffect(() => {
    if (!shopSchema?.schema) return
    setCards(shopSchema.schema)

    // 初始化获取数据后，向 preview 同步一次数据
    if (iFrame && iFrame.contentWindow) {
      setTimeout(() => {
        iFrame.contentWindow!.postMessage(shopSchema?.schema, 'http://localhost:3007/#/preview');
      }, 1000)
    }
  }, [shopSchema])
```
```
  // iframe端接收
  const [cards, setCards] = useState([]); // all component

  //监听低代码生成器端 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === 'http://localhost:3000') {
        e.data && setCards(e.data)
      }
    });
  }, []);

```
---
- 从组件区拖拽到预览区结束后同步两端数据，从低代码端发送到Iframe端
```
  // 低代码端发送数据
  useEffect(() => {
    if (iFrame && iFrame.contentWindow) {
      iFrame.contentWindow!.postMessage(cards, 'http://localhost:3007/#/preview');
    }
  }, [cards])
```
```
  // iframe端接收数据(同上)
  const [cards, setCards] = useState([]); // all component

  //监听低代码生成器端 传过来的postmessage
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === 'http://localhost:3000') {
        e.data && setCards(e.data)
      }
    });
  }, []);

```
---
- 在iframe端上拖拽排序，同步两端数据，从Iframe端发送到低代码端
``` 
  // Iframe端发送数据
  const [cards, setCards] = useState([]); // all component
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件

  // 初始化无需同步，因此使用ahooks的useUpdateEffect方法
  useUpdateEffect(() => {
    window.parent.postMessage({ compActiveIndex: compActiveIndex, cards: cards }, "*");
  }, [compActiveIndex])
```
```
  // 低代码端接收数据
  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards } = data;
      setCompActiveIndex(compActiveIndex);
      setCards(cards);
    });
  }, []);
```
### 3.2 拖拽实现
组件区的每个组件拖拽时，预览区显示模拟的iframe假盒子，拖拽结束后，显示真iframe
```
  // 组件区
  const [{ isDragging }, drag] = useDrag(
    {
      item: { comp: item, originalIndex: -1 },
      type: 'comp',
      end: (item: any, monitor: DragSourceMonitor) => {
        setShowIframe(true)
        if (monitor.didDrop()) {
          item.originalIndex = -1
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [],
  );

  useEffect(() => {
    if (isDragging) {
      setShowIframe(false)
    }
  }, [isDragging])
```
```
  // iframe区
  <iframe
    id="previewIframe"
    src="http://localhost:3007/#/preview"
    style={{ visibility: showIframe ? 'visible' : 'hidden' }}
  />
  <div
    style={{ visibility: !showIframe ? 'visible' : 'hidden' }}
  >
    ...
    <Card />
  </div>
```
```
  // iframe区
  <iframe
    id="previewIframe"
    src="http://localhost:3007/#/preview"
    style={{ visibility: showIframe ? 'visible' : 'hidden' }}
  />
  <div
    style={{ visibility: !showIframe ? 'visible' : 'hidden' }}
  >
    <DropCard/>
    ...
  </div>
  
  const DropCard = ()=>{
   ...
      // 拖拽放置区，react-dnd 方法
      const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
      >({
        accept: 'comp',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item: DragItem, monitor) {
          ...
          // 判断拖拽组件是否时来自组件区，-1是来自组件区，若不是组件区，则是组件内部的拖拽排序
          if (item.originalIndex !== -1) {
            setCards((prevCards: IComponentItemProps[]) =>
              update(prevCards, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, prevCards[dragIndex] as IComponentItemProps],
                ],
              }),
            )
          } else {
            setCards((prevCards: IComponentItemProps[]) =>
              update(prevCards, {
                $splice: [
                  [hoverIndex, 0, item.comp],
                ],
              }),
            )
          }
          item.originalIndex = hoverIndex
        },
      })
    // 组件内部的拖拽排序
    const [{ isDragging }, drag] = useDrag({
        type: 'comp',
        item: () => {
          return { comp: item, originalIndex: index }
        },
        isDragging: (monitor) => {
          return `card-${monitor.getItem().originalIndex}` === IDkey
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
     })
  }  
```
发生在iframe上的拖拽，拖拽方法同上，唯一不同的是，拖拽结束后，同步两端数据是由iframe端发送到低代码端。

### 3.3 配置区、预览区适配schema
再来看下实际的schema定义
```
 [
  {
    text: '标题文本',
    name: "titleText",
    icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FjAs6eTmbK_4lQRI3GYXu97Fj_B_.png',
    config: [
      {
        label: "标题内容",
        type: "input",
        format: "title",
        value: '请输入文本内容'
      },
      {
        label: "描述内容",
        type: "textarea",
        format: "content",
        value: '请输入标题内容'
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
```

- 配置区适配schema
```
const index = (props: IProps) => {
  const { cards, setCards, compActiveIndex } = props

  return (
    <div className="editor">
      {compActiveIndex !== null && (
        <>
          <h2>{cards[compActiveIndex].text}</h2>
          {cards[compActiveIndex].config.map((item, index) => (
            item.type === 'input' && (
              <div className='item'>
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
              <div className='item'>
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
              <div className='legend-line'>
                <div>
                  <span className='legend-line-title'>{item?.label || ''}</span>
                  <span className='legend-line-value'>{item?.config?.tooltip || ''}</span>
                </div>
                <div>
                  {
                    item?.configOptions?.length > 0 && (
                      item.configOptions.map((item2, index2) => (
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
        </>
      )}
    </div>
  )
}
```
配置区适配schema后效果：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaa360a37b5e49caaa79a50f6413f1e1~tplv-k3u1fbpfcp-watermark.image?)

- 预览区适配schema
```
<div>
  {item.name === 'titleText' && item?.config.map((item2, index2) => {
        return (
          <div
            key={`titleText-${index2}`}
            className='title-text-container'
            style={titleTextStyle['position']}
          >
            {item2.type === 'input' && (<span className='titleTextBlonder' style={titleTextStyle['title-size']}>{item2.value}</span>)}
            {item2.type === 'textarea' && (<span style={titleTextStyle['content-size']}>{item2.value}</span>)}
          </div>
        )
      })}
</div>
```
预览区适配schema后效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/424b6a75103d4f12b7ef206b03d670d9~tplv-k3u1fbpfcp-watermark.image?)

整体效果预览：

![动画3.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027c49f69eb0490b9548bae3a058f76e~tplv-k3u1fbpfcp-watermark.image?)

到现在低代码基本功能已经实现了，可以进行拖拽，低代码区域配置

## 四. 项目优化
根据有赞官方的'设计稿'继续完善我们的项目
### 4.1 预览区配置 header 和 footer
这一部分代码上比较简单，也没什么技术难点，话不多说，直接贴上最终效果图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a3ea4c23aef4c06b932bd1a682d6b02~tplv-k3u1fbpfcp-watermark.image?)
在这样的内部进行拖拽，就很舒服了 ^ _ ^ 有手机店铺的感觉了。


### 4.2 预览功能开发
因为我们的设计是用iframe嵌套的，这样的设计在开发预览功能时是相对比较方便

开发设计：
- 在**预览**系统中，新建一个不能拖拽，编辑的iframe页面
- 在**低代码**系统中，当点击预览功能时，跳转一个预览页面，嵌入上边的iframe

低代码：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/099c70600bac45d3b8b02db782a3ffd8~tplv-k3u1fbpfcp-watermark.image?)

预览：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63767bdb0d1c477c9e5b41a99e309945~tplv-k3u1fbpfcp-watermark.image?)


### 4.3 同步两端iframe被卷走的页面数据
问题：当在预览区域内容过长，页面内容发生滚动后，当进行拖拽，此时显示的假iframe的盒子并未滚动，假iframe盒子和真iframe盒子出现显示内容不同的问题。  
真iframe盒子：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ea0608613c54b3eb727222779866b6d~tplv-k3u1fbpfcp-watermark.image?)

拖拽时假iframe盒子：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66c67c3f8e834bfbae0220097c07a299~tplv-k3u1fbpfcp-watermark.image?)

解决方案：  
预览端的真iframe盒子进行滚动时，同步滚动的scrollTop值，发送给低代码端，低代码接受到后同步发生偏移。
```
// 预览端
  useEffect(() => {
    window.addEventListener('scroll', debounce(()=>{
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      window.parent.postMessage({ scrollY }, "*");
    }, 500))
  }, [])
```
```
// 低代码端

const [scrollY, setScrollY] = useState(0)

 useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const { compActiveIndex, cards, scrollY } = data;
      compActiveIndex !== null && setCompActiveIndex(compActiveIndex);
      cards && setCards(cards);
      setScrollY(scrollY)
    });
  }, []);
  return (
     <div
        className='preview'
        style={{ 
          top: -(scrollY ?? 0) + 56 + 16 +'px'
        }}
      >
      ...
     </div>
   )
```

## 项目地址
项目地址：  
https://github.com/KangXinzhi/h5maker  

创作不易，如有帮助，感谢star🙏


参考：   
https://juejin.cn/post/7015890033622646792
https://juejin.cn/post/6933385955789406222
