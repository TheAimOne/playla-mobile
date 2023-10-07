import { MaterialIcons } from '@expo/vector-icons'
import { Box, HStack, Heading, Icon } from 'native-base'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'


const TopBar = () => {

    return (
        <>
            <StatusBar barStyle={"default"} backgroundColor={"green"} />
            <Box safeAreaTop />
            <HStack style={styles.container}>
                <Icon size={8} as={<MaterialIcons name='sports-soccer' />} color={"green.800"}/>
                <Heading color={'green.800'} >Play Lah!</Heading>
            </HStack>
        </>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        padding: 12,
    },
    logo: {
        fontSize: 24,
    }
})