import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import moment from 'moment'
import { Button, Divider, HStack, Icon, Image, ScrollView, Spinner, Text, VStack, View } from 'native-base'
import React, { useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Card from '../../components/ui-components/Card'
import httpClient from '../../config'
import { EventDisplay, EventMember } from '../../core'
import { useAppSelector } from '../../store/hooks'
import { selectMemberId } from '../../store/features/user/user-slice'
import AlertPage from '../../components/ui-components/AlertPage'
import { ICustomAlertRef } from '../../core/types/common'

interface IEventDetailProps {
  route: RouteProp<{ params: { event: EventDisplay } }>
}

const EventDetail = (props: IEventDetailProps) => {

  const event = props.route.params?.event as EventDisplay
  const startDate = useMemo(() => moment(new Date(event.startDateAndTime)).format('MMM Do'), [])
  const memberId = useAppSelector(selectMemberId)
  const alertRef = useRef<ICustomAlertRef>()

  if (!event) {
    throw new Error("Event is empty")
  }

  const imageUri = require('../../assets/sports_image.jpg');

  const [eventMembers, setEventMembers] = React.useState<EventMember[]>([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    setLoading(true)
    getEventMembers()
  }, [])

  const getEventMembers = React.useCallback(() => {
    httpClient.get('events/members', { params: { eventId: event.eventId } }).then(res => {
      setEventMembers(res.data.data as EventMember[] || [])
      setLoading(false)
    })
  }, [])

  const onJoin = React.useCallback(() => {
    const payload = {
      eventId: event.eventId,
      groupId: event.groupId,
      memberId: memberId
    }
    httpClient.post('events/members', payload).then(res => {
      alertRef.current?.showAlert("Yay!. You have joined this event", "success");

    })
  },[])

  return (
    <View background={'white'} height={'100%'}>
      <AlertPage ref={alertRef as unknown as any}/>
      <Image source={imageUri} size={170} width={'100%'} resizeMode='cover' alt='event-image' />
      <VStack style={styles.eventHeader} space={2}>
        <HStack justifyContent={'space-between'} marginTop={1}>
          <Text fontSize={24} fontWeight={'bold'}>{event.name}</Text>
          <HStack marginRight={1} space={2} right={0}>
            <HStack backgroundColor={'green.100'} style={styles.eventDate} justifyContent={'center'}>
              <Icon as={<MaterialCommunityIcons name='currency-usd' />} size={21} />
              <Text style={styles.eventDateText} color={'green.900'}>{event.costPerPerson} /p</Text>
            </HStack>
            <HStack alignItems={'center'} backgroundColor={'blue.200'} style={styles.eventDate}>
              <Icon as={<MaterialCommunityIcons name='calendar' />} alignItems={'center'}
                size={23} marginRight={1} color={'blue.900'} />
              <Text style={styles.eventDateText} color={'blue.900'}>{startDate}</Text>
            </HStack>
          </HStack>
        </HStack>
        <Text fontSize={16}>{event.description}</Text>
        <Divider />
        <HStack marginTop={2} alignItems={'center'} color={'gray.500'} >
          <Icon as={<MaterialCommunityIcons name='clock' />} alignItems={'center'}
            size={23} marginRight={1} />
          <VStack>
            <Text fontSize={16} color={'blueGray.600'}>{event.startDateDisplay} / {event.startTimeDisplay}</Text>
            <Text fontSize={16} color={'blueGray.600'}>{event.endDateDisplay} / {event.endTimeDisplay}</Text>
          </VStack>
        </HStack>
        <HStack>
          <Icon as={<MaterialCommunityIcons name='map-marker' />} alignItems={'center'}
            size={23} marginRight={1} color={'blueGray.600'} />
          <Text fontSize={16} color={'blueGray.600'}>{event.venueName}, {event.venueAddress}</Text>
        </HStack>
        <VStack marginTop={1} height={'45%'} >
          <Text fontSize={22} fontWeight={'bold'}>Event Members</Text>
          {loading && <Spinner style={styles.defaultRespContainer} />}
          {!eventMembers.length &&
            <Text color={'coolGray.400'} style={styles.defaultRespContainer}>No Members</Text>}
          {!!eventMembers.length &&
            <ScrollView>
              {eventMembers.map((member: EventMember, index: number) =>
              (<Card key={index} style={{ margin: 2.5, padding: 5 }}>
                <HStack id='ar' borderBottomColor={'coolGray.400'} >
                  <VStack justifyContent={'center'} marginRight={2}>
                    <Icon as={<MaterialCommunityIcons name='account' />}
                      size={6} color={'primary.600'} />
                  </VStack>
                  <Divider orientation='vertical' marginRight={2} />
                  <VStack flex={1} justifyContent={'space-between'}>
                    <Text fontWeight={'semibold'}>{member.name}</Text>
                  </VStack>
                </HStack>
              </Card>)
              )}
            </ScrollView>}
        </VStack>
        <VStack>
          <Button bottom={0} width={'100%'} onPress={onJoin}>
            <Text color={'white'}>Join</Text>
          </Button>
        </VStack>
      </VStack>
    </View>
  )
}

const styles = StyleSheet.create({
  eventHeader: {
    marginTop: -30,
    padding: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  eventDate: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  eventDateText: {
    fontWeight: '600',
    fontSize: 16
  },
  defaultRespContainer: {
    flex: 1,
    marginTop: -20,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EventDetail