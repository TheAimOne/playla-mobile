import { Box, Spinner, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import GroupCard from '../../components/GroupCard'
import { getGroupsAction } from '../../store/features/group/group-api'
import { selectMemberId } from '../../store/features/user/user-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import httpClient from '../../config'
import { Group } from '../../core/types/Group'

const Home = () => {
  const memberId = useAppSelector(selectMemberId)
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const groupCards = <></>

  useEffect(() => {
    setIsLoading(true)
    httpClient.get("member/group", { params: { memberId: memberId } }).then(groupList => {
      setIsLoading(false)
      setGroupList(groupList.data)
    }).catch(err => {
      setIsLoading(false)
    })
  }, [])

  return (
    <Box style={styles.homeContainer}>
      <Box>
        <Text style={styles.header}>My Groups</Text>
        {isLoading && <Spinner color="green.500" />}
        {!isLoading && groupList.length == 0 &&
          <Text style={styles.defaultRespContainer} color={'gray.400'}>No Groups found</Text>}
        {!isLoading && groupList.length &&
          <VStack style={styles.groupListContainer}>
            {groupList.map((group, index) =>
              <GroupCard name={group.name} participants={group.size} upcomingEventDate={undefined} key={index}></GroupCard>)}
          </VStack>}
      </Box>
      <Box style={styles.eventContainer}>
        <Text style={styles.header}>Upcoming Events</Text>
      </Box>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
    margin: 6,
    marginTop: 15,
    flex: 1
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
  },
  groupListContainer: {
    margin: 10,
    gap: 5
  },
  defaultRespContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  eventContainer: {
    top: '30%'
  }
})