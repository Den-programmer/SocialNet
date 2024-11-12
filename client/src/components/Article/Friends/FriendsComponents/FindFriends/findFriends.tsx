import React from 'react'
import SearchNewfriends from './SearchNewFriends/searchNewFriends'
import UsersColumnContainer from './usersColumn/usersColumnContainer'
import { Pagination } from '@material-ui/lab'
import { scrollToTop } from '../../../../../utils/helpers/functions/function-helpers'

interface IFindFriends {
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    }
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    changePage: (page: number) => void
}

const FindFriends: React.FC<IFindFriends> = (props) => {
    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        props.changePage(page)
        setTimeout(() => scrollToTop(400), 250)
    }
    return (
        <div>
            <SearchNewfriends pageSize={props.usersInf.pageSize} currentPage={props.usersInf.currentPage} requestUsers={props.requestUsers} />
            <UsersColumnContainer />
            <div className="d-flex justify-center">
                <Pagination variant="outlined"
                    shape="rounded"
                    page={props.usersInf.currentPage}
                    count={Math.ceil(props.usersInf.totalCount)}
                    onChange={handleChangePage}
                    color="secondary" />
            </div>
        </div >
    )
}


export default FindFriends