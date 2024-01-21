import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Card from './Card'
import { ScrollView, Spinner, Text, VStack } from 'native-base'
import { Group } from '../core'
import GroupCard from './GroupCard'
import httpClient from '../config'
import { useAppSelector } from '../store/hooks'
import { selectMemberId } from '../store/features/user/user-slice'
import { useIsFocused } from '@react-navigation/native'
import { navigationRef } from '../RootNavigation'

const MyGroups = () => {
    const memberId = useAppSelector(selectMemberId)
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused()

    useEffect(() => {
        setIsLoading(true)
        httpClient.get("member/group", { params: { memberId: memberId } }).then(groupList => {
            setIsLoading(false)
            setGroupList(groupList?.data?.data ?? [])
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    const onGroupPress = React.useCallback((group: Group) => {
        if (!!group?.groupId) {
            navigationRef.current?.navigate("groupStack",
                { screen: 'groupDetail', params: { groupId: group.groupId } })
        }
    }, [])

    return (
        <Card style={styles.myGroupContainer}>
            <Text style={styles.header}>👥 My Groups </Text>
            {isLoading && <Spinner size={50} color="green.500" flex={1} justifyContent={'center'} />}
            {!isLoading && !groupList?.length &&
                <View style={styles.defaultRespContainer}>
                    <Text> <Text fontSize={25}>🤷🏻‍♂️</Text> You don't belong to any Group</Text>
                </View>}
            {!isLoading && !!groupList?.length &&
                <ScrollView>
                    <VStack style={styles.groupListContainer}>
                        {groupList.map((group, index) =>
                            <GroupCard name={group.name} participants={group.size}
                                upcomingEventDate={undefined} key={index}
                                onPress={() => onGroupPress(group)}></GroupCard>
                        )}
                    </VStack>
                </ScrollView>}
        </Card>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    myGroupContainer: {
        height: '50%',
        borderRadius: 10,
        padding: 10,
    },
    groupListContainer: {
        margin: 5,
        gap: 5
    },
    defaultRespContainer: {
        marginTop: -20,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default MyGroups