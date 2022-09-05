### 一些问题记录
- react-beautiful-dnd 方案失效，不能跨IFRAME拖拽
- react-dnd isDragging拖动时透明度失效，原因isDragging外层组件默认关联的key的id，若改变则失效，解决办法：重新在内部定义了isDragging的关联条件
- iframe 高度塌陷问题：高度直接设置position: absolute, top:0 ,bottom: 0，无高度。  解决方案：高度设置100%，其父组件也必须有高度，设成100%
- iframe在windows下，document有16px的padding，