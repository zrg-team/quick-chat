import { connect } from 'react-redux'
import ApproveForm from '../components/ApproveForm'
import { validateSessionSecurity } from '../../../common/utils/authentication'

const mapDispatchToProps = (dispatch, props) => ({
  unlock: async (password) => {
    try {
      const result = await validateSessionSecurity(password)
      if (result) {
        return true
      }
      return false
    } catch (err) {
      console.log('err', err)
      return false
    }
  }
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ApproveForm)
