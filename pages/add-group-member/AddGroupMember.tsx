import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import { Box, Button, Center, HStack, Icon, Input, ScrollView, Spinner, Text, VStack, View } from 'native-base'
import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { navigationRef } from '../../RootNavigation'
import Card from '../../components/ui-components/Card'
import { CustomAlertDialog, ICustomAlertRef } from '../../components/ui-components/CustomAlertDialog'
import httpClient from '../../axios-config'
import { Filter, FilterOperator, User, UserFilter } from '../../core'
import useDebounce from '../../core/hooks/useDebounce'

interface IMemberListItemProps {
  user: User,
  showClose: boolean,
  onDeleteItem?: (user: User) => void
}

const MemberListItem = ({ user, showClose, onDeleteItem }: IMemberListItemProps) => {
  return (
    <>
      {showClose && onDeleteItem &&
        <TouchableOpacity onPress={() => onDeleteItem!(user)}
          style={styles.memberItemClose}>
          <Icon as={<MaterialCommunityIcons name='close-circle' />}
            size={19} color={'red.700'} />
        </TouchableOpacity>
      }
      <VStack>
        <Text fontSize={15} fontWeight={'medium'}>{user.name}</Text>
        <HStack justifyContent={'space-between'}>
          <Text color={'gray.500'}>📞 {user.mobile}</Text>
          <Text color={'gray.500'}>✉️ {user.email}</Text>
        </HStack>
      </VStack>

    </>
  )
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
  const [isSearchListPresent, setIsSearchListPresent] = React.useState(true)

  const onInputChange = useDebounce((text: string) => {
    if (!text) {
      setSearchUserList([])
      return
    }
    if (text.length < 2) return;

    let filter = new UserFilter();

    filter.filter.isAnd = false
    filter.filter.criteria = [
      { key: 'name', value: text, operator: FilterOperator.CONTAINS },
      { key: 'email', value: text, operator: FilterOperator.CONTAINS }
    ];
    filter.excludeUserByGroupId = true
    filter.groupId = groupId

    setLoading(true)
    httpClient.post('users/search', filter).then((response: any) => {
      setSearchUserList(response?.data?.data || [])
      if (response?.data?.data.length === 0) {
        setIsSearchListPresent(false)
      } else {
        setIsSearchListPresent(true)
      }
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

  const onAddMember = () => {

    if (selectedUserList) {
      const payload = {
        groupId: groupId,
        members: selectedUserList.map(user => ({ memberId: user.userId, isAdmin: false }))
      }
      httpClient.post('group/members', payload).then(_ => {
        setIsSuccessful(true)
        alertRef.current?.showAlert("Group Members Added Successfully", "", "success");
      })
    }
  }

  const onAlertClose = React.useCallback(() => {
    if (isSuccessful) {
      navigationRef.current?.goBack();
    }
  }, [isSuccessful])

  const onDeleteItem = (user: User) => {
    setSelectedUserList(prevValue => {
      return prevValue.filter(selectedUser => selectedUser.userId !== user.userId)
    })
  }

  return (
    <View backgroundColor={'white'} height={'100%'}>
      <VStack style={{ margin: 8 }} >
        <HStack justifyContent={'space-between'} >
          <Text fontSize={20} fontWeight={'bold'}>Add Group Members</Text>
          <Button onPress={onAddMember}><Text color={'white'}>Save</Text></Button>
        </HStack>
        <ScrollView height={'30%'} marginTop={3}>
          {selectedUserList.map((user: User, index: number) => (
            <Card style={{ margin: 1 }} key={index}>
              <MemberListItem user={user} showClose={true} key={index}
                onDeleteItem={onDeleteItem} />
            </Card>
          ))}
        </ScrollView>
        <Input marginTop={5} placeholder='Search User by Username or email'
          onChangeText={onInputChange} />
        {loading && <Center> <Spinner size={'lg'} /></Center>}
        {!isSearchListPresent &&
          <Center marginTop={3}>
            <Text color={'gray.400'}>No Users Found</Text>
          </Center>}
        {searchUserList.length !== 0 && <ScrollView >
          {searchUserList.map((user: User, index: number) => (
            <TouchableOpacity onPress={() => onUserSelect(user)} key={index}>
              <Box borderColor={'gray.200'} style={styles.searchItem}>
                <MemberListItem user={user} showClose={false} />
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>}
        <CustomAlertDialog ref={alertRef as unknown as any} title='Create Event'
          onClose={onAlertClose} />
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
  },
  memberItemClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    zIndex: 99
  }
})

export default AddGroupMember