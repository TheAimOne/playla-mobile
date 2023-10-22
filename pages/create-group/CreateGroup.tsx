import { MaterialIcons } from '@expo/vector-icons'
import { Box, Button, FormControl, HStack, Icon, Image, Input, Text, TextArea, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import Card from '../../components/Card'
import { FormFieldControl, FormGroupUtils, Group, GroupMember } from '../../core'
import useFormGroup from '../../core/hooks/useFormGroup'
import httpClient from '../../config'
import { selectMemberId } from '../../store/features/user/user-slice'
import { useAppSelector } from '../../store/hooks'

const groupFormControls = {
    groupId: new FormFieldControl<string>(null, { required: false }),
    name: new FormFieldControl<string>(null, { required: true }),
    description: new FormFieldControl<string>(null, { required: false }),
    size: new FormFieldControl<Number>(null, { required: true })
}

const CreateGroup = () => {
    const imageUri = require('../../assets/user-group.png');
    const memberId = useAppSelector(selectMemberId)
    const [group, setGroup] = React.useState<Group | undefined>(undefined)

    const groupForm: FormGroupUtils = useFormGroup(groupFormControls)

    const handleInputChange = React.useCallback((value: any, key: string) => {
        groupForm.setValue(key, value)
    }, [])

    const onCreateGroup = React.useCallback(() => {
        groupForm.triggerChange();
        if (groupForm.isValid()) {
            const groupInfo: Group = groupForm.getValue() as Group
            groupInfo.size = +groupInfo.size
            const groupMembers: GroupMember[] = [{memberId: memberId, isAdmin: true, status: 'ACTIVE'}]
            httpClient.post("group", { groupInfo: groupInfo, members: groupMembers }).then(response => {
                console.log(response)
            })
        }
        
    }, [])

    return (
        <Box style={styles.createGroupContainer}>
            <Card>
                <VStack >
                    <Box style={styles.groupImage}>
                        <HStack>
                            <Image alt='group-image' source={imageUri} borderColor={'gray.300'}
                                size={150} style={styles.groupImage} />
                            <Button variant={'solid'} bg={'gray.300'} style={styles.selectImageButton} padding={2}>
                                <Icon color={'gray.600'} size={19} as={<MaterialIcons name={'add-a-photo'} />}></Icon>
                            </Button>
                        </HStack>
                    </Box>
                    <VStack style={styles.inputContainer}>
                        <FormControl isInvalid={!groupForm.get('name')?.valid}>
                            <FormControl.Label>Group Name</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='Enter Group Name'
                                onChangeText={text => handleInputChange(text, 'name')} isRequired={true} />
                        </FormControl>
                        <FormControl isInvalid={!groupForm.get('size')?.valid}>
                            <FormControl.Label>Number of Participants</FormControl.Label>
                            <Input size={'md'} variant={'underlined'} placeholder='' 
                                onChangeText={text => handleInputChange(text, 'size')} isRequired={true} />
                        </FormControl>
                        <TextArea h={20} placeholder='Description' autoCompleteType={''}
                            onChangeText={text => handleInputChange(text, 'description')} />
                        <Button variant={'solid'} onPress={onCreateGroup}>
                            <Text color={'white'}>Create Group</Text>
                        </Button>
                    </VStack>
                </VStack>
            </Card>
        </Box>
    )
}

const styles = StyleSheet.create({
    createGroupContainer: {
        margin: 15
    },
    groupImage: {
        margin: 0,
        display: 'flex',
        alignItems: 'center'
    },
    selectImageButton: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        opacity: 0.5
    },
    inputContainer: {
        gap: 8,
        margin: 10
    }
})

export default CreateGroup