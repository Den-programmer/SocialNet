import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getIsNewsLoadingStatus, getPopularNews } from '../../../../BLL/selectors/news-selectors'
import NewsToolbar from './newsToolbar'

const mapStateToProps = (state: RootState) => ({
    popularNews: getPopularNews(state),
    isLoading: getIsNewsLoadingStatus(state)
})

const NewsToolbarContainer = connect(mapStateToProps, {})(NewsToolbar)

export default NewsToolbarContainer