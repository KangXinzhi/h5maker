## 仿有赞的店铺低代码平台设计

### 设计思路
- 低代码页面布局：布局头部/内容区域，内容区域分为：左中右
- 头部存放预览、保存、下载按钮  
- 左侧为物料区可配置的组件列表，进行拖拽到中间区域进行设计
- 右侧为配置组件的区域，可配置选中组件的属性
- 中为预览区域，可以拖拽组件，是一个iframe嵌套方式的一个页面
  - 按钮拖拽效果
  - 拖拽时生成坐标
  - iframe接受坐标并响应UI变化
  - drop后响应UI变化，同步数据变化
- 数据
  - 数据存放在indexDB
- 预览区域是iframe的方式显示，参考有赞发现其内部使用的是iframe，这样的好处：
  - 有节省代码，不然要实现两边展示区的逻辑
  - 方便预览
- 跨 iframe 拖拽，一些拖拽组件如react-dnd react-beautiful-dnd 都无法实现，参考了掘金上的一些文章，转转团队它们因react-dnd不支持跨iframe便放弃了，自己使用原生H5的拖拽事件封装一个。而我参考一些文章后的设计思路：数据驱动视图，可以在拖动时显示一个和iframe样式相同的盒子，来模拟iframe进行拖拽，因为在同一组件中并未设计到跨iframe并不会有任何问题，可以使用任何方式完成如react-dnd，只需拖拽结束后同步数据，传给iframe，iframe接收到数据后进行显示

### 物料区组件schema定义
```
{
  "name": "button",
  "compId": "Button",
  "description": "按钮组件",
  "icon": "",
  "config": [
    {
      "name": "bgcColor",
      "label": "按钮颜色",
      "type": "string",
      "format": "color"
    },
    {
      "name": "btnText",
      "label": "按钮文案",
      "type": "string",
      "format": "text"
    }
  ],
  "defaultConfig": { "btnText": "这是一个按钮", "bgcColor": "#333333" },
}
```




### 问题记录
- react-beautiful-dnd 方案失效，不能跨IFRAME拖拽
- react-dnd isDragging拖动时透明度失效，原因isDragging外层组件默认关联的key的id，若改变则失效，解决办法：重新在内部定义了isDragging的关联条件
- iframe 高度塌陷问题：高度直接设置position: absolute, top:0 ,bottom: 0，无高度。  解决方案：高度设置100%，其父组件也必须有高度，设成100%