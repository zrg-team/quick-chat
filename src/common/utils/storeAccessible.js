import composeStore from '../store'

class StoreAccessible {
  /**
   * @protected
   */
  getState () {
    const { store } = composeStore
    return store.getState()
  }

  /**
   * @protected
   */
  getModuleState (moduleName) {
    const { store } = composeStore
    const state = store.getState()
    return state[moduleName] || {}
  }

  /**
   * @protected
   */
  get dispatch () {
    const { store } = composeStore
    return store.dispatch
  }

  clearPersistStore () {
    const { persistor } = composeStore
    persistor.flush()
  }
}

export default new StoreAccessible()
