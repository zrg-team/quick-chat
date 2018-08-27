// ##############################
// // // CustomInput styles
// #############################

import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from '../../material-kit-react.js'

const customInputStyle = {
  disabled: {
    '&:before': {
      backgroundColor: 'transparent !important'
    }
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      backgroundColor: '#D2D2D2',
      height: '1px !important'
    },
    '&:after': {
      backgroundColor: primaryColor
    }
  },
  underlineError: {
    '&:after': {
      backgroundColor: dangerColor
    }
  },
  underlineSuccess: {
    '&:after': {
      backgroundColor: successColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: '#AAAAAA !important',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857'
  },
  labelRootError: {
    color: dangerColor + ' !important'
  },
  labelRootSuccess: {
    color: successColor + ' !important'
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: '2',
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    pointerEvents: 'none'
  },
  marginTop: {
    marginTop: '0px !important',
    padding: '0px 0px 0px 0px'
  },
  formControl: {
    paddingBottom: '7px',
    margin: '27px 0 0 0',
    position: 'relative'
  },
  formControlLabel: {
    margin: '0px 0 0 0'
  },
  whiteUnderline: {
    '&:hover:not($disabled):before,&:before': {
      backgroundColor: '#FFFFFF'
    },
    '&:after': {
      backgroundColor: '#FFFFFF'
    }
  },
  input: {
    '&,&::placeholder': {
      color: '#AAAAAA',
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1'
    },
    height: '65px !important',
    paddingLeft: 15,
    paddingTop: 15
  },
  multiline: {
    padding: '0px 0px 0px 0px'
  },
  whiteInput: {
    '&,&::placeholder': {
      color: '#FFFFFF',
      opacity: '1'
    }
  },
  inputMultiline: {
    padding: '0px 0px 0px 0px'
  }
}

export default customInputStyle
