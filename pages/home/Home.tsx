import { Box, ScrollView, Spinner, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { navigationRef } from '../../RootNavigation'
import Card from '../../components/Card'
import GroupCard from '../../components/GroupCard'
import httpClient from '../../config'
import { Group } from '../../core/types/Group'
import { selectMemberId } from '../../store/features/user/user-slice'
import { useAppSelector } from '../../store/hooks'


const Home = () => {
  const memberId = useAppSelector(selectMemberId)
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    httpClient.get("member/group", { params: { memberId: memberId } }).then(groupList => {
      setIsLoading(false)
      setGroupList(groupList?.data?.data ?? [])
    }).catch(err => {
      setIsLoading(false)
    })
  }, [])

  const onGroupPress = React.useCallback((group: Group) => {
    if (!!group?.groupId) {
      navigationRef.current?.navigate("groupStack",
        { screen: 'groupDetail', params: { groupId: group.groupId } })
    }
  }, [])

  return (
    <VStack style={styles.homeContainer}>
      <Card style={styles.myGroupContainer}>
        <Text style={styles.header}>My Groups</Text>
        {isLoading && <Spinner size={50} color="green.500" flex={1} justifyContent={'center'} />}
        {!isLoading && !groupList?.length &&
          <Text style={styles.defaultRespContainer} color={'gray.400'}>No Groups found</Text>}
        {!isLoading && !!groupList?.length &&
          <ScrollView>
            <VStack style={styles.groupListContainer}>
              {groupList.map((group, index) =>
                <GroupCard name={group.name} participants={group.size}
                  upcomingEventDate={undefined} key={index}
                  onPress={() => onGroupPress(group)}></GroupCard>
              )}
            </VStack>
          </ScrollView>}
      </Card>
      <Box style={styles.eventContainer}>
        <Text style={styles.header}>Upcoming Events</Text>
      </Box>
    </VStack>
  )
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
    margin: 10,
    marginTop: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  myGroupContainer: {
    height: '50%',
    borderRadius: 10,
    padding: 10,
  },
  groupListContainer: {
    margin: 5,
    gap: 5
  },
  defaultRespContainer: {
    marginTop: 20,
  },
  eventContainer: {
    height: '50%'
  }
})