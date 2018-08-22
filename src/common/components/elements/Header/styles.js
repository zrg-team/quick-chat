// ##############################
// // // Header styles
// #############################

import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from '../../../styles/common'

const headerStyle = theme => ({
  appBar: {
    top: '-30px',
    [theme.breakpoints.down('md')]: {
      top: '-15px'
    },
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block'
  },
  container,
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    top: '10px',
    '&:hover,&:focus': {
      background: 'transparent'
    }
  },
  appResponsive: {
    top: '8px'
  },
  primary: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  root: {
    display: 'flex',
    position: 'absolute',
    padding: theme.spacing.unit / 2,
    overflowX: 'hidden',
    maxHeight: 400,
    overflowY: 'auto',
    flexDirection: 'column',
    top: 60,
    right: 60
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`
  }
})

export default headerStyle
