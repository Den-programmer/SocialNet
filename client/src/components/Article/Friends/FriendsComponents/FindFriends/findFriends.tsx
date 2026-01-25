import React from 'react'
import SearchNewfriends from './SearchNewFriends/searchNewFriends'
import UsersColumn from './usersColumn/usersColumn'
import { Pagination } from 'antd'
import { scrollToTop } from '../../../../../utils/helpers/functions/function-helpers'
import { useAppDispatch, useAppSelector, useAuthRedirect } from '../../../../../hooks/hooks'
import { changePage } from '../../../../../BLL/reducer-friends'
import { selectUsersFilter, selectUsersInf } from '../../../../../BLL/selectors/users-selectors'

const FindFriends: React.FC = () => {
  const dispatch = useAppDispatch()
  const usersInf = useAppSelector(selectUsersInf)
  const { term } = useAppSelector(selectUsersFilter)
  useAuthRedirect()

  const handleChangePage = (page: number) => {
    dispatch(changePage(page))
    setTimeout(() => scrollToTop(400), 250)
  }

  return (
    <div>
      <SearchNewfriends
        pageSize={usersInf.pageSize}
        currentPage={usersInf.currentPage}
        term={term}
      />
      <UsersColumn />
      <div style={{ display: 'flex', justifyContent: 'center', margin: "24px 0" }}>
        <Pagination
          current={usersInf.currentPage}
          pageSize={usersInf.pageSize}
          total={usersInf.totalCount}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default FindFriends
