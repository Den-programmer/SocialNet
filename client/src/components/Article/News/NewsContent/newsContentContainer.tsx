import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getNews } from '../../../../BLL/selectors/news-selectors'
import NewsContent from './newsContent'
import { actions } from '../../../../BLL/reducer-news'

const { chooseNewsPageId } = actions

const mapStateToProps = (state: RootState) => ({
    news: getNews(state)
})

const NewsContentContainer = connect(mapStateToProps, { chooseNewsPageId })(NewsContent)

export default NewsContentContainer 