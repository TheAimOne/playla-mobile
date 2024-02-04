import { MaterialIcons } from '@expo/vector-icons'
import { Box, HStack, Heading, Icon, Text } from 'native-base'
import React from 'react'
import { Platform, StatusBar, StyleSheet } from 'react-native'

const Logo = () => (
    <HStack style={styles.container}>
        <Icon size={8} as={<MaterialIcons name='sports-volleyball' />} color={"green.800"} />
        <Text color={'green.800'} fontFamily={'kayana'} fontSize={31}
            paddingLeft={1} marginTop={Platform.OS === 'android' ? '1' : '-0.5'}>PlayLah!</Text>
    </HStack>
)

const TopBar = () => {

    return (
        <>
            <StatusBar barStyle={"default"} backgroundColor={"green"} />
            <Logo />
        </>
    )
}

export { TopBar, Logo }

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    }
})