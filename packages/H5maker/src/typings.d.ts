declare module 'slash2'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'omit.js'
declare module '*.json'

declare module '*.json' {
  const value: any
  export default value
}
declare module 'json!*' {
  const value: any
  export default value
}
// google analytics interface
interface GAFieldsObject {
  eventCategory: string
  eventAction: string
  eventLabel?: string
  eventValue?: number
  nonInteraction?: boolean
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void
  reloadAuthorized: () => void
  ReactNativeWebView: {
    postMessage: (this: any) => void
  }
}

// declare let ga: Function;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false
declare const GLOBAL_CONFIG: Record<'API_SERVER_URL' | 'CDN_URL' | 'START_ENV' | 'HOST', string>

declare module 'moment' {
  import type { Dayjs } from 'dayjs'

  namespace moment {
    type Moment = Dayjs
  }
  export = moment
}

declare module '@multiavatar/multiavatar'
