import { connect } from 'react-redux';
import Article from './Article';

let mapStateToProps = (state) => {
    return {
        isProfileFetching: state.isProfileFetching,
    }
}

const ArticleContainer = connect(mapStateToProps, null)(Article);

export default ArticleContainer;