import { connect } from 'react-redux'
import Article from './Article'
import { RootState } from '../../BLL/redux'
import { getUserDialogId } from '../../BLL/selectors/messages-selectors'
import { getLastUrl, getIsAuthStatus } from '../../BLL/selectors/auth-selectors'
import { getNewsPageId } from '../../BLL/selectors/news-selectors'
import { getIsMembersColumnOpenedStatus } from '../../BLL/selectors/profile-selectors'
import { getHeaderHeight } from '../../BLL/selectors/selectors'

const mapStateToProps = (state: RootState) => ({
    userDialogId: getUserDialogId(state),
    lastUrl: getLastUrl(state),
    isAuth: getIsAuthStatus(state),
    newsPageId: getNewsPageId(state),
    isMembersColumnOpen: getIsMembersColumnOpenedStatus(state),
    headerHeight: getHeaderHeight(state)
})

const ArticleContainer = connect(mapStateToProps, {})(Article)

export default ArticleContainer