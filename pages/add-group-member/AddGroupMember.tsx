import { Box, Button, Center, Divider, HStack, Input, ScrollView, Spinner, Text, VStack, View } from 'native-base'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Card from '../../components/ui-components/Card'
import httpClient from '../../config'
import { Filter, FilterOperator, User } from '../../core'
import useDebounce from '../../core/hooks/useDebounce'
import { StyleSheet } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { CustomAlertDialog, ICustomAlertRef } from '../../components/ui-components/CustomAlertDialog'
import { navigationRef } from '../../RootNavigation'

const MemberListItem = ({ user }: { user: User }) => {
  return (
    <HStack justifyContent={'space-between'}>
      <VStack>
        <Text fontSize={16} fontWeight={'bold'}>{user.name}</Text>
        <Text color={'gray.500'}>✉️ {user.email}</Text>
      </VStack>
      <Text color={'gray.500'}>📞 {user.mobile}</Text>
    </HStack>)
}

interface IAddGroupMemberProps {
  route: RouteProp<{ params: { groupId: string } }>
}

const AddGroupMember = (props: IAddGroupMemberProps) => {

  const [searchUserList, setSearchUserList] = React.useState<User[]>([])
  const [selectedUserList, setSelectedUserList] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(false)
  const alertRef = useRef<ICustomAlertRef>()
  const groupId = props.route.params.groupId
  const [isSuccessful, setIsSuccessful] = React.useState(false)

  const onInputChange = useDebounce((text: string) => {
    if (!text) {
      setSearchUserList([])
      return
    }
    if (text.length < 3) return;

    let filter = new Filter();
    filter.isAnd = false
    filter.criteria = [{ key: 'name', value: text, operator: FilterOperator.CONTAINS },
    { key: 'email', value: text, operator: FilterOperator.CONTAINS }];
    setLoading(true)
    httpClient.post('users/search', filter).then((response: any) => {
      setSearchUserList(response?.data?.data || [])
      setLoading(false)
    }, err => { setLoading(false) })
  }, 2000)

  const onUserSelect = React.useCallback((user: User) => {
    setSelectedUserList(prevValue => {
      if (!prevValue.some(selectedUser => selectedUser.userId === user.userId)) {
        return [...prevValue, user]
      }
      return prevValue
    })
  }, [])

  const onAddMember = React.useCallback(() => {

    if (selectedUserList) {
      const payload = {
        groupId: groupId,
        members: selectedUserList.map(user => ({memberId: user.userId, isAdmin: false}))
      }
      httpClient.post('group/members', payload).then(_ => {
        setIsSuccessful(true)
        alertRef.current?.showAlert("Group Members Added Successfully", "", "success");
      })
    }
  }, [])

  const onAlertClose = React.useCallback(() => {
    if (isSuccessful) {
        navigationRef.current?.goBack();
    }
}, [isSuccessful])

  return (
    <View backgroundColor={'white'} height={'100%'}>
      <VStack style={{ margin: 8 }} >
        <HStack justifyContent={'space-between'} >
          <Text fontSize={20} fontWeight={'bold'}>Add Group Members</Text>
          <Button onPress={onAddMember}><Text color={'white'}>Save</Text></Button>
        </HStack>
        <Input marginTop={5} placeholder='Search User by Username or email'
          onChangeText={onInputChange} />
        {loading && <Center> <Spinner size={'lg'} /></Center>}
        <ScrollView height={'30%'}>
          {searchUserList.map((user: User, index: number) => (
            <TouchableOpacity onPress={() => onUserSelect(user)} key={index}>
              <Box borderColor={'gray.200'} style={styles.searchItem}>
                <MemberListItem user={user} />
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Divider />
        <Box marginTop={2}>
          <Text fontSize={18} fontWeight={'semibold'}>Selected Members</Text>
          <ScrollView height={'40%'}>
            {selectedUserList.map((user: User, index: number) => (
              <Card style={{ margin: 1 }}>
                <MemberListItem user={user} key={index} />
              </Card>
            ))}
          </ScrollView>
        </Box>
        <CustomAlertDialog ref={alertRef as unknown as any} title='Create Event'
                        onClose={onAlertClose}/>
      </VStack>
    </View>
  )
}

const styles = StyleSheet.create({
  searchItem: {
    margin: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 3
  }
})

export default AddGroupMember