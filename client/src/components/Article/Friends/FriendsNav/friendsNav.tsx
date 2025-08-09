import React from 'react'
import { Flex, Grid } from 'antd'
import { createFriendsNavBtn } from '../../../../utils/helpers/functions/function-helpers'
import { useAuthRedirect } from '../../../../hooks/hooks'

const { useBreakpoint } = Grid

const FriendsNav: React.FC = () => {
  useAuthRedirect()
  const screens = useBreakpoint()
  const findFriends = screens.xs ? 'Find' : 'Find Friends'

  return (
    <Flex justify="space-between" align="center" style={{ margin: '40px auto' }}>
      <Flex gap="small">
        {createFriendsNavBtn("Here's your friends!", "/Friends/DataFriends", "Friends")}
        {createFriendsNavBtn("You can find new friend here!", "/Friends/FindUsers", findFriends)}
      </Flex>
      <div>
        {createFriendsNavBtn("Untermensches", "/Blacklist", "Blacklist")}
      </div>
    </Flex>
  )
}

export default FriendsNav