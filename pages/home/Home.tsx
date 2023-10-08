import { Box, HStack, Icon, Image, Text, VStack, View } from 'native-base'
import React from 'react'
import Card from '../../components/Card'
import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import GroupCard from '../../components/GroupCard'

const Home = () => {
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