import { useAtom } from "jotai";
import { showIframeAtom } from '../../../../store'


import './index.less'
import { Thumbnail } from './Thumbnail'
import { componentList } from './schema'

const index = (props: { setShowIframe: (showIframe: boolean) => void }) => {
  const [, setShowIframe] = useAtom<boolean>(showIframeAtom)

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