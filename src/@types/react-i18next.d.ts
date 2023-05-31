import { en } from '@app/localization/languages'
import 'i18next'

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}
