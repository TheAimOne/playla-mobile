import { MaterialIcons } from '@expo/vector-icons'
import { Box, Divider, HStack, Icon, ScrollView, Skeleton, Text, VStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { EventDisplay } from '../core'
import { commonStyles } from '../core/utils'
import Card from './ui-components/Card'

const loadingSkeleton = () => {
    return Array.from(Array(2).keys()).map(ar => (
        <VStack key={ar} h={40} style={[commonStyles.cardStyle, commonStyles.eventSkeletonStyle]}
            padding={4} borderColor='coolGray.300'>
            <Skeleton.Text startColor={'gray.300'} />
            <Skeleton marginTop={5} startColor={'gray.300'} />
        </VStack>
    ))
}

interface IEventListProps {
    eventList: EventDisplay[]
    loading: boolean
    onPress?: (event: EventDisplay) => void
}

const EventList = (props: IEventListProps) => {

    const onPressHandler = props.onPress ? props.onPress : () => {}

    return (
        <>
            {props.loading && loadingSkeleton()}
            {!props.loading && !props.eventList.length && <Box flex={1}
                justifyContent={'center'} alignItems={'center'}  >
                <Text fontSize={16} color={'coolGray.400'}>
                    <Text fontSize={20}>🚶🏻</Text> No Events Found</Text>
            </Box>}
            {props.eventList &&
                <ScrollView marginTop={2} >
                    {props.eventList.map(eve =>
                        <TouchableOpacity key={eve.eventId}
                            onPress={() => onPressHandler(eve)}>
                            <Card style={commonStyles.cardStyle} >
                                <Text style={{ fontWeight: '500', fontSize: 16 }}>{eve.name} </Text>
                                <HStack marginTop={2} >
                                    <Icon as={<MaterialIcons name='location-pin' />} color={'gray.400'} size={5} />
                                    <Text color={'gray.500'}>{eve.venueName}</Text>
                                </HStack>
                                <HStack justifyContent={'space-between'}>
                                    <HStack justifyContent={'center'} alignItems={'center'} padding={2}>
                                        <Icon as={<MaterialIcons name='calendar-today' />} color={'red.700'} size={7} />
                                        <VStack>
                                            <Text marginLeft={2}>{eve.startDateDisplay}</Text>
                                            <Text marginLeft={2} color={'coolGray.500'}>{eve.startTimeDisplay}</Text>
                                        </VStack>
                                    </HStack>
                                    <Divider orientation='vertical' height={'90%'}></Divider>
                                    <VStack justifyContent={'center'} alignItems={'center'} padding={2}>
                                        <Text color={'gray.500'}>Participants</Text>
                                        <Text fontSize={25} fontWeight={500} >{eve.noOfJoinedParticipants}/{eve.noOfParticipants} </Text>
                                    </VStack>
                                </HStack>
                            </Card>
                        </TouchableOpacity>
                    )}
                </ScrollView>}
        </>

    )
}

export default EventList