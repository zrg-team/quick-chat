import { connect } from 'react-redux'
import SignUpForm from '../components/SignUpForm'
import { authenticationEmail, createUserByEmail } from '../../../common/utils/authentication'

const mapDispatchToProps = (dispatch, props) => ({
  signup: async (email, password) => {
    try {
      const result = await createUserByEmail(email, password)
      console.log('signup result', result)
      return { success: true }
    } catch (err) {
      console.log('err', err)
      return { success: false, message: err.message }
    }
  },
  signupEmail: async (email) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
