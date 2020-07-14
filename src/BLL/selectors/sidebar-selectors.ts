import { RootState } from "../redux";

export const getSideBarNavLinks = (state: RootState) => {
    return state.Sidebar.navigationLinks;
}