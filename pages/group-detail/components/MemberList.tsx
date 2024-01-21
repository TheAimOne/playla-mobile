import { MaterialIcons } from '@expo/vector-icons'
import { Box, Button, Divider, HStack, Icon, Image, ScrollView, Skeleton, Text, VStack, View } from 'native-base'
import React, { useEffect } from 'react'
import Card from '../../../components/Card'
import { StyleSheet } from 'react-native'
import httpClient from '../../../config'

const loadingSkeleton = () => {
    return <VStack padding={4}>
        {Array.from(Array(5).keys()).map(ar => (
            <Skeleton key={ar} marginBottom={2.5} startColor={'gray.300'} />
        ))}
    </VStack>
}

const MemberList = ({ groupId }: any) => {
    const [memberList, setMemberList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true)
        httpClient.get('group/members', { params: { groupId: groupId } }).then(response => {
            setLoading(false)
            setMemberList(response.data)
        });
    }, [groupId])

    return (
        <View backgroundColor={'light.100'} height={'100%'}>
            {loading && loadingSkeleton()}
            {!loading && !memberList.length &&
                <Box flex={1}
                    justifyContent={'center'} alignItems={'center'}  >
                    <Text fontSize={16} color={'coolGray.400'}>
                        <Text fontSize={20}>🚶🏻</Text> No Members</Text>
                </Box>}
            <ScrollView margin={2}>
                {memberList.map(ar =>
                    <Card style={{ margin: 2.5, padding: 5 }}>
                        <HStack id='ar' borderBottomColor={'coolGray.400'} >
                            {/* <Image alt='group-image' borderColor={'gray.300'} size={6} marginRight={2} /> */}
                            <Text marginRight={2}>👤</Text>
                            <Divider orientation='vertical' marginRight={2} />
                            <Text>Member {ar}</Text>
                        </HStack>
                    </Card>
                )}
            </ScrollView>
            <Button backgroundColor={'primary.600'} style={styles.addButton}
                borderColor={'primary.700'}
                size={16} onPress={() => { }}>
                <Icon as={<MaterialIcons name='add' />} color={'white'} size={9} />
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15,
        borderRadius: 20,
    }
})


export default MemberList