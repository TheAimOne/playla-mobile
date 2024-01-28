import { MaterialIcons } from '@expo/vector-icons'
import { Box, Button, Divider, HStack, Icon, ScrollView, Skeleton, Text, VStack, View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { navigationRef } from '../../../RootNavigation'
import Card from '../../../components/ui-components/Card'
import httpClient from '../../../config'
import { Event, EventDisplay, useIfFocused } from '../../../core'
import commonStyles from '../utils'

const loadingSkeleton = () => {
    return Array.from(Array(2).keys()).map(ar => (
        <VStack key={ar} h={40} style={[commonStyles.cardStyle, commonStyles.eventSkeletonStyle]}
            padding={4} borderColor='coolGray.300'>
            <Skeleton.Text startColor={'gray.300'} />
            <Skeleton marginTop={5} startColor={'gray.300'} />
        </VStack>
    ))
}

const EventList = ({ groupId }: any) => {
    const [eventList, setEventList] = React.useState<EventDisplay[]>([]);
    const [loading, setLoading] = React.useState(false)

    useIfFocused(() => {
        setLoading(true)
        httpClient.get('group/events', {
            params: {
                groupId: groupId,
                getCountOfParticipants: true
            }
        }).then(response => {
            setLoading(false)
            if (response.data?.data) {
                (response.data?.data as Event[]).forEach((event: Event) => {
                    setDateAndTime(event, "start");
                    setDateAndTime(event, "end");
                })
                setEventList(response.data?.data as EventDisplay[] || [])
            }
        });
    })

    const setDateAndTime = React.useCallback((event: Event, key: string) => {
        const eventKey = `${key}Date` as keyof Event
        const apiKey = `${key}DateAndTime` as keyof Event
        if (event[apiKey]) {
            (event[eventKey] as Date) = new Date(event[apiKey] as Date);
            (event[eventKey + "Display" as keyof Event] as string) =
                `${(event[eventKey] as Date).toDateString()}`;
            (event[`${key}TimeDisplay` as keyof Event] as string) =
                `${(event[eventKey] as Date).toLocaleTimeString()}`;

        }
    }, [])


    const onAddPress = React.useCallback(() => {
        navigationRef.current?.navigate('groupStack',
            { screen: 'addEvent', params: { groupId: groupId } })
    }, [])

    return (
        <View height={'100%'} backgroundColor={'light.100'}>
            {loading && loadingSkeleton()}
            {!loading && !eventList.length && <Box flex={1}
                justifyContent={'center'} alignItems={'center'}  >
                <Text fontSize={16} color={'coolGray.400'}>
                    <Text fontSize={20}>🚶🏻</Text> No Events Found</Text>
            </Box>}
            {eventList &&
                <ScrollView marginTop={2} >
                    {eventList.map(eve =>
                        <Card style={commonStyles.cardStyle} key={eve.eventId}>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>{eve.name} </Text>
                            <HStack marginTop={2} >
                                <Icon as={<MaterialIcons name='location-pin' />} color={'gray.400'} size={5} />
                                <Text color={'gray.500'}>Sengkang CC, Sengkang</Text>
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
                    )}
                </ScrollView>}
            <Button backgroundColor={'primary.600'} style={commonStyles.addButton}
                borderColor={'primary.700'}
                size={16} onPress={onAddPress}>
                <Icon as={<MaterialIcons name='add' />} color={'white'} size={9} />
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default EventList