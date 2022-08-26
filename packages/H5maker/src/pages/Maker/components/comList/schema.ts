export interface IComponentItemProps {
  text: string
  name: string
  icon: string
  config: {
    label: string
    type: string
    format: string
    value?: string
    config?: {
      icon: string
      style: React.CSSProperties
      tooltip: string,
    }
    configOptions?: {
      icon: string
      style: React.CSSProperties
      tooltip: string,
    }[]
  }[]
}

export const componentList: IComponentItemProps[] = [
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