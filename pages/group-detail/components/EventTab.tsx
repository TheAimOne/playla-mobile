import { MaterialIcons } from '@expo/vector-icons'
import { Button, Icon, View } from 'native-base'
import React from 'react'
import { navigationRef } from '../../../RootNavigation'
import httpClient from '../../../axios-config'
import { Event, EventDisplay, createFilter, equals$, greaterThan$, useIfFocused } from '../../../core'
import { commonStyles } from '../../../core/utils'
import EventList from '../../../components/EventList'

const EventTab = ({ groupId }: any) => {
    const [eventList, setEventList] = React.useState<EventDisplay[]>([]);
    const [loading, setLoading] = React.useState(false)

    useIfFocused(() => {
        setLoading(true)
        const filter = createFilter(
            equals$("groupId", groupId),
            greaterThan$("startDateAndTime", new Date().toISOString())
        );
        httpClient.post(`events/search?getCountOfParticipants={true}`, filter).then(response => {
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

    const onEventPress = React.useCallback((event: EventDisplay) => {
        navigationRef.current?.navigate('groupStack', {
            screen: 'eventDetail', params: { event: event }
        })
    }, [])

    return (
        <View height={'100%'} backgroundColor={'light.100'}>
            <EventList eventList={eventList} loading={loading} onPress={onEventPress} />
            <Button backgroundColor={'primary.600'} style={commonStyles.addButton}
                borderColor={'primary.700'}
                size={16} onPress={onAddPress}>
                <Icon as={<MaterialIcons name='add' />} color={'white'} size={9} />
            </Button>
        </View>
    )
}

export default EventTab