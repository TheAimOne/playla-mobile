import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import { Box, Button, FormControl, HStack, Icon, Input, ScrollView, Select, Text, TextArea, VStack, WarningOutlineIcon } from 'native-base';
import React, { useRef } from 'react';
import AlertPage from '../../components/ui-components/AlertPage';
import Card from '../../components/ui-components/Card';
import { ICustomAlertRef } from '../../components/ui-components/CustomAlertDialog';
import DatePicker from '../../components/ui-components/DatePicker';
import httpClient from '../../config';
import { DateErrors, Event, FormFieldControl } from '../../core';
import useFormGroup from '../../core/hooks/useFormGroup';

const eventFormControls = {
    eventId: new FormFieldControl<string>(null, { required: false }),
    name: new FormFieldControl<string>(null, { required: true }),
    type: new FormFieldControl<string>(null, { required: true }),
    noOfParticipants: new FormFieldControl<Number>(null, { required: true }),
    startDateAndTime: new FormFieldControl<Date>(new Date(), { required: true }),
    endDateAndTime: new FormFieldControl<Date>(new Date(), { required: true }),
    description: new FormFieldControl<string>(null, { required: true }),
    venueId: new FormFieldControl<string>(null, { required: false }),
    totalCost: new FormFieldControl<string>(null, { required: true }),
    currency: new FormFieldControl<string>(null, { required: true })
}


interface IAddEventProps {
    route: RouteProp<{ params: { groupId: string } }>
}

const AddEvent = (props: IAddEventProps) => {
    const eventForm = useFormGroup(eventFormControls);
    const alertRef = useRef<ICustomAlertRef>()
    const groupId = props.route?.params?.groupId


    const handleInputChange = (key: string, value: any) => {
        eventForm.setValue(key, value)
    }

    const handleDateChange = (key: string, value: any) => {
        eventForm.setValue(key, value);
        const startDate = eventForm.get('startDateAndTime')
        const endDate = eventForm.get('endDateAndTime')
        if (moment(endDate.value).isBefore(startDate.value)) {
            eventForm.setError('startDateAndTime', DateErrors.END_DATE_BEFORE_START_DATE);
        } else if (moment(startDate.value).isBefore(moment.now())) {
            eventForm.setError('startDateAndTime', DateErrors.PAST_DATE);
        }
        else {
            eventForm.clearError('startDateAndTime')
        }
    }

    const onCreateEvent = React.useCallback(() => {
        eventForm.triggerChange();
        if (eventForm.isValid()) {
            const newEvent = eventForm.getValue() as Event;
            newEvent.venueId = '8f8c298e-ef85-43d3-aa3e-cf75092ad60a'
            newEvent.noOfParticipants = +newEvent.noOfParticipants
            newEvent.totalCost = +newEvent.totalCost
            newEvent.groupId = groupId
            newEvent.creatorId = 'e2462a2d-dbca-45ee-b182-76367754634f'
            httpClient.post("events", newEvent).then(response => {
                alertRef.current?.showAlert('Event created Successfully', "success")
            }).catch(err => {
                alertRef.current?.showAlert('Event creation Failed', err?.message || '', "error",
                    undefined, true)
            })
        }

    }, [])

    return (
        <>
            <AlertPage ref={alertRef as unknown as any} />
            <ScrollView margin={2}>
                <Card style={{ padding: 8 }}>
                    <VStack>
                        <HStack marginBottom={3}>
                            <Icon as={<Ionicons name='calendar-sharp' />} marginRight={2}
                                size={8} color={'lightBlue.600'} />
                            <Text fontSize={18} fontWeight={'bold'}>Add Event</Text>
                        </HStack>
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
                        <Box>
                            <FormControl isInvalid={!eventForm.isFieldValid('startDateAndTime')}>
                                <FormControl.Label>Start / End Date & Time</FormControl.Label>
                                <DatePicker mode='datetime' value={eventForm.get('startDateAndTime').value}
                                    onValueChange={(date) => handleDateChange('startDateAndTime', date)} />
                                <DatePicker mode='datetime' value={eventForm.get('endDateAndTime').value} style={{ marginTop: 5 }}
                                    onValueChange={(date) => handleDateChange('endDateAndTime', date)} />
                                {eventForm.get('startDateAndTime').error == DateErrors.END_DATE_BEFORE_START_DATE
                                    && <FormControl.ErrorMessage size="s"
                                        leftIcon={<WarningOutlineIcon size="xs" />} >
                                        Start date should be greater than End date
                                    </FormControl.ErrorMessage>}
                                {eventForm.get('startDateAndTime').error == DateErrors.PAST_DATE
                                    && <FormControl.ErrorMessage size="s"
                                        leftIcon={<WarningOutlineIcon size="xs" />} >
                                        Start Date should be a future date & time
                                    </FormControl.ErrorMessage>}
                            </FormControl>
                        </Box>
                        <FormControl>
                            <FormControl.Label>Venue</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='Enter Venue'
                                isRequired={true} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Total Cost</FormControl.Label>
                            <HStack >
                                <Select size={'md'} variant='underlined' flex={1}
                                    onValueChange={text => handleInputChange('currency', text)}>
                                    <Select.Item label='SGD' value='SGD' />
                                </Select>
                                <Input size={'md'} flex={1} flexBasis={'40%'}
                                    variant={'underlined'} placeholder='Total Cost'
                                    isRequired={true} keyboardType='numeric'
                                    onChangeText={text => handleInputChange('totalCost', text)} />
                            </HStack>
                        </FormControl>
                        <Button onPress={onCreateEvent} marginTop={3}>
                            <Text color={'white'}>Create Event</Text></Button>
                        {/* <CustomAlertDialog ref={alertRef as unknown as any} title='Create Event'
                            onClose={onAlertClose} /> */}

                    </VStack>
                </Card>
            </ScrollView>
        </>
    )
}



export default AddEvent