import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_ROOM } from './room/models'
import { MODULE_NAME as MODULE_MESSAGE } from './message/models'
import userReducers from './user/reducers'
import roomReducers from './room/reducers'
import messageReducers from './message/reducers'

export default {
  [MODULE_USER]: userReducers,
  [MODULE_ROOM]: roomReducers,
  [MODULE_MESSAGE]: messageReducers
}
