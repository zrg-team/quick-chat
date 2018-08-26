import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './common/hocs/Root'
import store, { history } from './common/store'
import registerServiceWorker from './registerServiceWorker'
import './assets/scss/material-kit-react.css'
import 'react-chat-elements/dist/main.css'
import './common/utils/firebase'
import './common/styles/app.css'
import './common/styles/transition.css'

render(
  <AppContainer>
    <Root {...store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./common/hocs/Root', () => {
    const NextRoot = require('./common/hocs/Root')
    render(
      <AppContainer>
        <NextRoot {...store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

registerServiceWorker()
