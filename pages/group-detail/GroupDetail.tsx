import { MaterialIcons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import { Box, HStack, Icon, Image, Text } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Card from '../../components/ui-components/Card'
import httpClient from '../../axios-config'
import { Group } from '../../core'
import { LOGIN_BG_COLOR } from '../../core/constants'
import EventTab from './components/EventTab'
import MemberList from './components/MemberList'

interface GroupDetailProps {
  route: RouteProp<{ params: { groupId: string } }>
}

const renderScene = ({route, groupId}: any) => {
  switch (route.key) {
    case "events": 
      return <EventTab groupId={groupId} />
    case "members":
      return <MemberList groupId={groupId} />
  }
}

const routes = [
  { key: 'events', title: 'Events', icon: 'event' },
  { key: 'members', title: 'Members', icon: 'person-pin' },
];

const imageUri = require('../../assets/user-group.png');

const GroupDetail = (props: GroupDetailProps) => {
  const groupId = props.route?.params?.groupId
  const [group, setGroup] = React.useState<Group>()
  const [index, setIndex] = React.useState(0)


  useEffect(() => {
    httpClient.get('group', { params: { groupId: groupId } }).then(response => {
      setGroup(response.data)
    }).catch(err => {

    })
  }, [groupId])

  return (
    <>
      <Box style={styles.groupHeaderContainer} bg={LOGIN_BG_COLOR}>
        <Card style={styles.groupImage} >
          <Image alt='group-image' source={imageUri} borderColor={'gray.300'} size={70} />
        </Card>
        <Text fontSize={22} fontWeight={"extrabold"} color={'white'}>{group?.name}</Text>
        <Text color={'white'}> 🙋🏻‍♂️ {group?.size} Participants</Text>
      </Box>
      <TabView
        style={styles.groupDetailContainer}
        navigationState={{ index, routes }}
        renderScene={({route}) => renderScene({ route, groupId })}
        renderTabBar={props =>
          <TabBar {...props} style={{ backgroundColor: 'white' }}
            indicatorStyle={{ backgroundColor: 'green' }}
            renderLabel={({ route, color }) => (
              <HStack>
                <Icon as={<MaterialIcons name={route.icon as any} />} color={'lightBlue.600'}
                  marginTop={0.5} size={6} />
                <Text fontWeight={'bold'} fontSize={18} > {route.title}</Text>
              </HStack>
            )} />}
        onIndexChange={setIndex}
      />
    </>
  )
}

const borderStyles = StyleSheet.create({
  borderRadius: {
    borderRadius: 20
  }
})

const styles = StyleSheet.create({

  groupDetailContainer: {
    backgroundColor: 'black',
    height: '100%',
    ...borderStyles.borderRadius,
  },
  groupHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 25,
    marginBottom: -20
  },
  groupImage: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 50,
    backgroundColor: 'white'
  },
})

export default GroupDetail