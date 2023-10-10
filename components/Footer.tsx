import { MaterialIcons } from '@expo/vector-icons'
import { Box, Center, HStack, Icon, Pressable, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { navigate } from '../RootNavigation'


const footerItems = [
    { icon: 'groups', name: 'My Groups', navigateTo: 'home' },
    { icon: 'search', name: 'Search', navigateTo: 'search' },
    { icon: 'event', name: 'Events', navigateTo: 'events' }
]

const Footer = () => {
    const [selected, setSelected] = React.useState(0)

    const navigateToPages = (index: number) => {
        setSelected(index)
        navigate(footerItems[index].navigateTo, {})
    }

    return (

        <Box style={styles.footerContainer} flex={1} bg={"white"} safeAreaTop width="100%">
            <HStack bg={"green.700"} alignItems={"center"} safeAreaBottom>
                {footerItems.map((item, index) =>
                    <Pressable opacity={selected === index ? 1 : 0.5} key={index}
                        py="2" flex={1} onPress={() => navigateToPages(index)}>
                        <Center>
                            <Icon as={<MaterialIcons
                                name={item.icon} />} color="white" size="lg" />
                            <Text color="white" fontSize="13">
                                {item.name}
                            </Text>
                        </Center>
                    </Pressable>)}
            </HStack>
        </Box>
    )
}

export default Footer

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 20,
    }
})