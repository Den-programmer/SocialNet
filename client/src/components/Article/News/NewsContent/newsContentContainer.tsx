import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getIsNewsLoadingStatus, getNews } from '../../../../BLL/selectors/news-selectors'
import NewsContent from './newsContent'
import { actions, requestNews, requestPopularNews } from '../../../../BLL/reducer-news'

const { chooseNewsPageId } = actions

const mapStateToProps = (state: RootState) => ({
    news: getNews(state),
    isLoading: getIsNewsLoadingStatus(state)
})

const NewsContentContainer = connect(mapStateToProps, { chooseNewsPageId, requestNews, requestPopularNews })(NewsContent)

export default NewsContentContainer 