import { MODULE_NAME as MODULE_MAP } from './map/models'
import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_ROOM } from './room/models'
import { MODULE_NAME as MODULE_PUBLIC } from './publics/models'
import { MODULE_NAME as MODULE_MESSAGE } from './message/models'
import mapReducers from './map/reducers'
import userReducers from './user/reducers'
import roomReducers from './room/reducers'
import publicsReducers from './publics/reducers'
import messageReducers from './message/reducers'

export default {
  [MODULE_MAP]: mapReducers,
  [MODULE_USER]: userReducers,
  [MODULE_ROOM]: roomReducers,
  [MODULE_PUBLIC]: publicsReducers,
  [MODULE_MESSAGE]: messageReducers
}
