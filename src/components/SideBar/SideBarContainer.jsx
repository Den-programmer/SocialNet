import { connect } from 'react-redux';
import SideBar from './SideBar';
import { getSideBarNavLinks } from '../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        navLinks: getSideBarNavLinks(state),
    }
}

const SideBarContainer = connect(mapStateToProps, {  })(SideBar);

export default SideBarContainer;