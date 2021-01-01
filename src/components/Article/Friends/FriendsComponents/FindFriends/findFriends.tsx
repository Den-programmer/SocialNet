import React from 'react'
import SearchNewfriends from './SearchNewFriends/searchNewFriends'
import UsersColumnContainer from './usersColumn/usersColumnContainer'
import Paginator from '../../../../common/Paginator/Paginator'

interface IFindFriends {
    usersInf: {
        isFetching: boolean
        totalCount: number
        pageSize: number
        currentPage: number
    } 
    requestUsers: (pageSize: number, currentPage: number, term: string) => void
    changePage: (p: number) => void
}

const FindFriends: React.FC<IFindFriends> = (props) => {
    return (
        <div>
            <SearchNewfriends pageSize={props.usersInf.pageSize} currentPage={props.usersInf.currentPage} requestUsers={props.requestUsers}/>
            <UsersColumnContainer  />
            <Paginator pageSize={props.usersInf.pageSize} 
            totalItemsCount={props.usersInf.totalCount}
            currentPage={props.usersInf.currentPage}
            changePage={props.changePage}/>
        </div>
    )
}


export default FindFriends