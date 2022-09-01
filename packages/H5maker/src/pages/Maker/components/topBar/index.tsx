import { Button, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../db';
import './index.less'

const index = ({ cards }: { cards: any }) => {
  const { id } = useParams()
  const navigate = useNavigate();
  const shopId = id && +id
  const handleSave = async () => {
    const res = await db.ShopList?.update(shopId, { "schema": cards })
    if (res) {
      message.success('保存成功！')
    } else {
      message.error('保存失败！')
    }
  }

  return (
    <div className="top-bar">
      <div
        className="top-bar-back"
        onClick={async () => {
          navigate(`/`)
        }}
      >
        返回微页面
      </div>
      <div className="decorate-action">
        <Button
          onClick={async () => {
            await db.ShopList?.update(shopId, { "schema": cards })
            navigate(`/shop/preview/${id}`)
          }}
        >
          预览
        </Button>
        <Button style={{ margin: '0 16px' }} onClick={handleSave}>保存</Button>
        <Button type="primary">下载</Button>
      </div>
    </div>
  )
}

export default index