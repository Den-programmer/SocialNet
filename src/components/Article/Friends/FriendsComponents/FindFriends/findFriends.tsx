import React from 'react'
import classes from './findFriends.module.css'
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
    changePage: (p: number) => void
}

const FindFriends: React.FC<IFindFriends> = (props) => {
    return (
        <div className={classes.findFriends}>
            <SearchNewfriends />
            <UsersColumnContainer  />
            <Paginator pageSize={props.usersInf.pageSize} 
                               totalItemsCount={props.usersInf.totalCount}
                               currentPage={props.usersInf.currentPage}
                               changePage={props.changePage}/>
        </div>
    )
}


export default FindFriends