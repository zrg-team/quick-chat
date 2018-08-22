import { container, title } from '../../../material-kit-react.js'

import modalStyle from '../../modalStyle.js'
import tooltipsStyle from '../../tooltipsStyle.js'
import popoverStyles from '../../popoverStyles.js'

const javascriptStyles = {
  section: {
    padding: '70px 0 0'
  },
  container,
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  icon: {
    width: '17px',
    height: '17px',
    marginRight: '4px'
  },
  ...modalStyle,
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0'
  },
  ...tooltipsStyle,
  ...popoverStyles
}

export default javascriptStyles
