// ##############################
// App styles
// #############################

import { drawerWidth, transition, container } from './common'

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh'
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100% - 123px)'
  },
  container,
  defaulRow: {
    height: '72px',
    width: '100%'
  },
  fullHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  flexContainer: {
    flex: 1,
    overflow: 'auto'
  },
  messageContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column'
  }
})

export default appStyle
