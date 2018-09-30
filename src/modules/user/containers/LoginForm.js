import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { setSessionLoading } from '../../../common/actions/session'
import { authenticationEmail, signInByEmail } from '../../../common/utils/authentication'

const mapDispatchToProps = (dispatch, props) => ({
  login: async (email, password) => {
    try {
      const result = await signInByEmail(email, password)
      if (result) {
        dispatch(setSessionLoading(true))
        return { success: true }
      }
      return { success: false, message: 'Please verify your email !' }
    } catch (err) {
      console.log('err', err)
      return { success: false, message: err.message }
    }
  },
  loginEmail: async (email) => {
    try {
      const result = await authenticationEmail(email)
      return { success: true }
    } catch (err) {
      console.log('err', err)
      return { success: false, message: err.message }
    }
  }
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
