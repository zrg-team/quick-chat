import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF'
  }
})

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

let instanceNotification = null
class ConsecutiveSnackbars extends React.Component {
  queue = []

  state = {
    open: false,
    messageInfo: {},
  }

  componentWillMount () {
    instanceNotification = this
  }

  componentWillUnmount () {
    // delete instanceNotification
    instanceNotification = null
  }

  show = (message, variant) => {
    this.queue.push({
      message,
      variant,
      key: new Date().getTime(),
    });
    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  }

  handleExited = () => {
    this.processQueue();
  }

  render() {
    const { classes } = this.props;
    const { message, key, variant } = this.state.messageInfo;
    const Icon = variantIcon[variant]

    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            className={classNames(classes[variant], classes.margin)}
            aria-describedby='client-snackbar'
            message={
              <span id='client-snackbar' className={classes.message}>
                <Icon color='primary' className={classNames(classes.icon || '', classes.iconVariant || '')} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    )
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default {
  Component: withStyles(styles)(ConsecutiveSnackbars),
  show (message, variant = 'info') {
    instanceNotification && instanceNotification.show(message, variant)
  },
  success (message) {
    instanceNotification && instanceNotification.show(message, 'success')
  },
  error (message) {
    instanceNotification && instanceNotification.show(message, 'error')
  },
  info (message) {
    instanceNotification && instanceNotification.show(message, 'info')
  },
  warning (message) {
    instanceNotification && instanceNotification.show(message, 'warning')
  },
  hide () {
    instanceNotification && instanceNotification.handleClose(null, null)
  }
}