import { Ionicons } from '@expo/vector-icons'
import { Button, FormControl, HStack, Icon, Input, Select, Text, TextArea, VStack, View } from 'native-base'
import React, { useRef } from 'react'
import Card from '../../components/Card'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Event, FormFieldControl } from '../../core';
import useFormGroup from '../../core/hooks/useFormGroup';
import httpClient from '../../config';
import { CustomAlertDialog, ICustomAlertRef } from '../../components/CustomAlertDialog';
import { navigationRef } from '../../RootNavigation';
import { RouteProp } from '@react-navigation/native';

const eventFormControls = {
    eventId: new FormFieldControl<string>(null, { required: false }),
    name: new FormFieldControl<string>(null, { required: true }),
    type: new FormFieldControl<string>(null, { required: true }),
    noOfParticipants: new FormFieldControl<Number>(null, { required: true }),
    startDate: new FormFieldControl<Date>(null, { required: false }),
    startTime: new FormFieldControl<Date>(null, { required: false }),
    endDate: new FormFieldControl<Date>(null, { required: false }),
    endTime: new FormFieldControl<Date>(null, { required: false }),
    description: new FormFieldControl<string>(null, { required: true }),
    venueId: new FormFieldControl<string>(null, { required: false })
}

interface IAddEventProps {
    route: RouteProp<{ params: { groupId: string } }>
}

const AddEvent = (props: IAddEventProps) => {
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date());
    const eventForm = useFormGroup(eventFormControls);
    const alertRef = useRef<ICustomAlertRef>()
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const groupId = props.route?.params?.groupId


    const viewAndroidDatePicker = () => {
        DateTimePickerAndroid.open({ value: date, mode: 'date' })
    }

    const viewAndroidTimePicker = () => {
        DateTimePickerAndroid.open({ value: date, mode: 'time' })
    }

    const handleInputChange = (key: string, value: any) => {
        eventForm.setValue(key, value)
    }

    const onCreateEvent = React.useCallback(() => {
        eventForm.triggerChange();
        if (eventForm.isValid()) {
            const newEvent = eventForm.getValue() as Event;
            newEvent.venueId = '8f8c298e-ef85-43d3-aa3e-cf75092ad60a'
            newEvent.noOfParticipants = +newEvent.noOfParticipants
            newEvent.groupId = groupId  
            newEvent.creatorId = 'e2462a2d-dbca-45ee-b182-76367754634f'
            httpClient.post("events", newEvent).then(response => {
                setIsSuccessful(true)
                alertRef.current?.showAlert('Event created Successfully', "", "success")
            }).catch(err => {
                setIsSuccessful(false)
                alertRef.current?.showAlert('Event creation Failed', err?.message || '', "error")
            })
        }

    }, [])

    const onClose = () => {
        if (isSuccessful) {
            navigationRef.current?.goBack();
        }
    }

    return (
        <View margin={3}>
            <Card style={{ padding: 8 }}>
                <VStack>
                    <HStack marginBottom={3}>
                        <Icon as={<Ionicons name='calendar-sharp' />} marginRight={2}
                            size={8} color={'lightBlue.600'} />
                        <Text fontSize={18} fontWeight={'bold'}>Add Event</Text>
                    </HStack>
                    <VStack space={3}>
                        <FormControl isInvalid={!eventForm.isFieldValid('name')}>
                            <FormControl.Label>Event Name</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='Enter Event Name'
                                onChangeText={text => handleInputChange('name', text)} />
                        </FormControl>
                        <FormControl isInvalid={!eventForm.isFieldValid('type')}>
                            <FormControl.Label>Event type</FormControl.Label>
                            <Select size={'md'} variant={'underlined'} placeholder='Select Event type'
                                onValueChange={text => handleInputChange('type', text)}>
                                <Select.Item label='Sports' value='SPORTS' />
                            </Select>
                        </FormControl>
                        <FormControl isInvalid={!eventForm.isFieldValid('description')}>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea autoCompleteType={''} placeholder='Enter Description' size={'md'}
                                onChangeText={text => handleInputChange('description', text)} />
                        </FormControl>
                        <FormControl isInvalid={!eventForm.isFieldValid('noOfParticipants')}>
                            <FormControl.Label>Max number of Participants</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='No. of Participants'
                                onChangeText={text => handleInputChange('noOfParticipants', text)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Start / End Date & Time</FormControl.Label>
                            {Platform.OS === 'ios' && <VStack space={1} alignItems={'flex-start'}>
                                <DateTimePicker value={new Date()} mode='datetime' />
                                <DateTimePicker value={new Date()} mode='datetime' />
                            </VStack>}
                            {Platform.OS === 'android' && <VStack space={1}>
                                <HStack space={2}>
                                    <Button backgroundColor={'trueGray.200'}
                                        onPress={viewAndroidDatePicker} padding={2}>
                                        <Text>{date.toDateString()}</Text></Button>
                                    <Button backgroundColor={'trueGray.200'}
                                        onPress={viewAndroidTimePicker} padding={2}>
                                        <Text>{time.toLocaleTimeString()}</Text></Button>
                                </HStack>
                                <HStack space={2}>
                                    <Button backgroundColor={'trueGray.200'} padding={2}
                                        onPress={viewAndroidDatePicker}>
                                        <Text>{date.toDateString()}</Text></Button>
                                    <Button backgroundColor={'trueGray.200'}
                                        onPress={viewAndroidTimePicker} padding={2}>
                                        <Text>{time.toLocaleTimeString()}</Text></Button>
                                </HStack>
                            </VStack>}
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Venue</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='Enter Venue'
                                isRequired={true} />
                        </FormControl>
                        <Button onPress={onCreateEvent}>
                            <Text color={'white'}>Create Event</Text></Button>
                        <CustomAlertDialog ref={alertRef as unknown as any} title='Create Event' onClose={onClose} />
                    </VStack>
                </VStack>
            </Card>
        </View>
    )
}



export default AddEvent