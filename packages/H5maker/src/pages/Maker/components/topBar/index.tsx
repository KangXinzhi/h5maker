import { Button, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'

import { useAtom } from "jotai"
import { cardsAtom } from '../../../../store'

import { db } from '../../../../db'
import './index.less'

const index = () => {
  const [cards, setCards] = useAtom(cardsAtom)
  const { id } = useParams()
  const navigate = useNavigate()
  const shopId = id && +id
  const handleSave = async () => {
    const res = await db.ShopList?.update(shopId, { "schema": cards })
    if (res) {
      message.success('保存成功！')
    } else {
      message.error('保存失败！')
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(cards)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
  
    const exportFileDefaultName = "data.json";
  
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (): void => {
    const input = document.createElement("input")
    input.type = "file";
    input.accept = "application/json";
  
    input.addEventListener("change", async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) {
        message.error("请选择文件！")
        return;
      }
  
      const data = await readJsonFromFile(file)
      if (data) {
        handleFileData(data)
      }
    })
  
    input.click()
  };
  
  const readJsonFromFile = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          resolve(data)
        } catch (error) {
          reject(new Error("文件格式不正确！"))
        }
      };
      reader.onerror = () => {
        reject(new Error("读取文件失败！"))
      };
      reader.readAsText(file)
    })
  };
  
  const handleFileData = (data: any): void => {
    if (Array.isArray(data)) {
      setCards(data)
      message.success("导入成功！")
    } else {
      message.error("文件格式不正确！")
    }
  };
  

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
        <Button style={{ margin: '0 16px 0 0 ' }} type="primary" onClick={handleImport}>导入</Button>
        <Button type="primary" onClick={handleExport}>导出</Button>
      </div>
    </div>
  )
}

export default index