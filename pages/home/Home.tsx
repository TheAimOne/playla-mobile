import { Box, Text } from 'native-base'
import React from 'react'
import Card from '../../components/Card'
import { StyleSheet } from 'react-native'

const Home = () => {
  return (
    <Box>
      <Text style={styles.header}>My Groups</Text>
      <Box style={styles.groupListContainer}>
        <Card>
          <Text>Group 1</Text>
        </Card>
      </Box>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '600',
    margin: 6,
    marginTop: 10
  },
  groupListContainer: {
    margin: 8
  }
})