import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

export default Page => {
  return props =>
    <CSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={0}
      transitionEnterTimeout={400}
      transitionLeaveTimeout={0}
      transitionName='SlideIn'
    >
      <Page {...props} />
    </CSSTransitionGroup>
}
