import { connect } from 'react-redux'
import Article from './Article'
import { RootState } from '../../BLL/redux'
import { getUserDialogId } from '../../BLL/selectors/messages-selectors'
import { getLastUrl, getIsAuthStatus } from '../../BLL/selectors/auth-selectors'

const mapStateToProps = (state: RootState) => ({
    userDialogId: getUserDialogId(state),
    lastUrl: getLastUrl(state),
    isAuth: getIsAuthStatus(state)
})

const ArticleContainer = connect(mapStateToProps, {})(Article)

export default ArticleContainer