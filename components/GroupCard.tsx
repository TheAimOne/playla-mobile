import { MaterialIcons } from '@expo/vector-icons'
import { Box, HStack, Icon, Image, Text, VStack, View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import Card from './Card'

interface GroupCardProps {
    name: string
    participants: number
    image?: string
    upcomingEventDate?: string
}

const GroupCard = (props: GroupCardProps) => {
    const imageUri = props?.image ? { uri: props.image } : require('../assets/user-group.png');

    return (
        <>
            <Card>
                <HStack style={styles.groupCardContainer}>
                    <Image alt='group-image' source={imageUri} borderColor={'gray.300'} size={60} style={styles.groupImage} />
                    <VStack paddingLeft={6}>
                        <Text fontSize={16} fontWeight={"500"}>{props.name}</Text>
                        <Text color={'gray.500'}>{props.participants} Participants</Text>
                    </VStack>
                    <Box style={styles.upcomingEventContainer} borderLeftColor={'gray.500'}>
                        <Icon as={<MaterialIcons name='calendar-today' />} size={35} />
                        <Text flexWrap={'wrap'} >{props.upcomingEventDate}</Text>
                    </Box>
                </HStack>
            </Card>
        </>
    )
}

export default GroupCard

const styles = StyleSheet.create({
    groupCardContainer: {
        padding: 4,
        flexDirection: 'row'
    },
    groupImage: {
        borderRadius: 100,
        borderWidth: 1,
    },
    upcomingEventContainer: {
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.3,
        paddingLeft: 10,
    }
})