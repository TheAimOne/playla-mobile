import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Button, HStack, Text, VStack, View } from 'native-base'
import React, { useEffect } from 'react'
import { Platform, StyleProp, ViewStyle } from 'react-native'

export type AndroidDatePickerModes = 'date' | 'time' | 'datetime'

interface IAndroidDatePickerProps {
    mode: AndroidDatePickerModes
    value: Date
    format?: string
    onValueChange?: (date: Date) => void,
    style?: StyleProp<ViewStyle> | undefined,
}

const DatePicker = (props: IAndroidDatePickerProps) => {

    const [dateValue, setDateValue] = React.useState<Date>(new Date())
    const [timeValue, setTimeValue] = React.useState<Date>(new Date())

    useEffect(() => {
        if (props.value) {
            setDateValue(props.value)
        }
    }, [props.value])

    const viewAndroidDatePicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(), mode: 'date', onChange: (_, date) => {
                setDateValue(date as Date)
                if (props.onValueChange) {
                    props?.onValueChange(date as Date)
                }
            }
        })
    }

    const viewAndroidTimePicker = () => {
        DateTimePickerAndroid.open({
            value: dateValue, mode: 'time', onChange: (_, time) => {
                setTimeValue(time as Date)
                if (props.onValueChange) {
                    props?.onValueChange(time as Date)
                }
            }
        })
    }

    const iosDateTimePickerChange = (_: DateTimePickerEvent, date?: Date) => {
        if (props.onValueChange) {
            props.onValueChange(date as Date)
        }
    }

    return (
        <View style={props.style}>
            {Platform.OS === 'android' && <VStack space={1}>
                <HStack space={2}>
                    <Button backgroundColor={'trueGray.200'}
                        onPress={viewAndroidDatePicker} padding={2}>
                        <Text>{dateValue?.toDateString()}</Text></Button>
                    {(props.mode === 'datetime' || props.mode === 'time') && <Button backgroundColor={'trueGray.200'}
                        onPress={viewAndroidTimePicker} padding={2}>
                        <Text>{timeValue.toLocaleTimeString()}</Text></Button>}
                </HStack>
            </VStack>}
            {Platform.OS === 'ios' && <HStack>
                <DateTimePicker
                    value={dateValue as Date} mode={props.mode}
                    onChange={iosDateTimePickerChange} />
            </HStack>}
        </View>
    )
}

export default DatePicker