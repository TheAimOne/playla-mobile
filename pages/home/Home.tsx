import { Box, Text, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import GroupCard from '../../components/GroupCard'
import { selectMemberId, selectUser } from '../../store/features/user/user-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import { getGroupsAction } from '../../store/features/group/group-api'

const Home = () => {
  const dispatch = useAppDispatch();
  const memberId = useAppSelector(selectMemberId)
  console.log("memberId::", memberId)
  const groupList = dispatch(getGroupsAction(memberId))

  return (
    <Box>
      <Text style={styles.header}>My Groups</Text>
      <VStack style={styles.groupListContainer}>
        <GroupCard name='Football Group' participants={40} upcomingEventDate='08/10/2023' ></GroupCard>
        <GroupCard name='My Group' participants={23} upcomingEventDate='08/10/2023' ></GroupCard>
      </VStack>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '600',
    margin: 6,
    marginTop: 20
  },
  groupListContainer: {
    margin: 8,
    gap: 5
  }
})