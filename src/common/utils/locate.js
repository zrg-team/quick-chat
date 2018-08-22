import I18n from 'i18n-js'
import moment from 'moment'
import storeAccessible from './storeAccessible'
import { DEFAULT_LANGUAGE } from '../models'
import { setUserLanguage } from '../actions/common'

I18n.defaultLocale = DEFAULT_LANGUAGE
I18n.fallbacks = true
I18n.translations = {
  en: require('../../assets/lang/en.json')
}

export default async function () {
  try {
    const language = storeAccessible.getModuleState('common').language
    const appLocale = language || DEFAULT_LANGUAGE
    storeAccessible.dispatch &&
      storeAccessible.dispatch(setUserLanguage(appLocale))
    moment.locale = appLocale
  } catch (error) {
    console.error(error)
    storeAccessible.dispatch &&
      storeAccessible.dispatch(setUserLanguage(DEFAULT_LANGUAGE))
  }
}
