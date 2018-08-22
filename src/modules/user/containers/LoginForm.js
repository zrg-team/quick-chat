import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { authenticationEmail, signInByEmail } from '../../../common/utils/authentication'

const mapDispatchToProps = (dispatch, props) => ({
  login: async (email, password) => {
    try {
      const result = await signInByEmail(email, password)
      if (result) {
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
      console.log('result', result)
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
