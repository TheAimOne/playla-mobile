import { RouteProp } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import React, { useEffect } from 'react'
import Card from '../../components/Card'
import { StyleSheet } from 'react-native'
import { Group } from '../../core'
import { GROUP_HEADER_BG_COLOR, LOGIN_BG_COLOR } from '../../core/constants'

interface GroupDetailProps {
  route: RouteProp<{ params: { groupId: string } }>
}

const imageUri = require('../../assets/user-group.png');

const GroupDetail = (props: GroupDetailProps) => {
  // console.log(props.route?.params?.groupId)
  const [group, setGroup] = React.useState<Group>()

  useEffect(() => {

  }, [])

  return (
    <>
      <Box backgroundColor={'white'}>
        <Box style={styles.groupHeaderContainer} bg={LOGIN_BG_COLOR}>
          <Card style={styles.groupImage} >
            <Image alt='group-image' source={imageUri} borderColor={'gray.300'} size={70}/>
          </Card>
          <Text fontSize={22} fontWeight={"extrabold"} color={'white'}>Group Name</Text>
          <Text color={'white'}>20 participants</Text>
        </Box>
        <Card style={styles.groupDetailContainer}>
          <Box>Participants</Box>
          <Box>Events</Box>
        </Card>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  groupDetailContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%'
  },
  groupHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 40,
    marginBottom: -20
  },
  groupImage: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 50,
    backgroundColor: 'white'
  }
})

export default GroupDetail