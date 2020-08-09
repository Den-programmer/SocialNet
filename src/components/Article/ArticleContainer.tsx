import { connect } from 'react-redux'
import Article from './Article'
import { RootState } from '../../BLL/redux'
import { getUserDialogId } from '../../BLL/selectors/messages-selectors'

const mapStateToProps = (state: RootState) => ({
    userDialogId: getUserDialogId(state)
})

const ArticleContainer = connect(mapStateToProps, {})(Article)

export default ArticleContainer