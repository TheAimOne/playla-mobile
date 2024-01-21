import { Box, Text, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import MyGroups from '../../components/MyGroups'


const Home = () => {

  return (
    <VStack style={styles.homeContainer}>
      <MyGroups />
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
  
  eventContainer: {
    height: '50%'
  }
})