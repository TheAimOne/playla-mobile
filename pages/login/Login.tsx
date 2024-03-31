import LottieView from 'lottie-react-native'
import { Box, Button, Input, Text, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import Card from '../../components/ui-components/Card'
import { LOGIN_BG_COLOR } from '../../core/constants'
import { setUser } from '../../store/features/user/user-slice'

interface LoginProps {
    loginSuccess: () => void
}

const Login = (props: LoginProps) => {
    const dispatch = useDispatch()

    const onLogin = () => {
        props.loginSuccess()
        dispatch(setUser({
            isAuthenticated: true,
            userId: "733385ca-ff27-421b-a905-82865eb66004",
            name: "Ajay",
            status: "ACTIVE",
            email: 'ajay.sankaran96@gmail.com',
            mobile: '8283810',
            shortName: 'Aj'
        }))
    }

    return (
        <Box bg={LOGIN_BG_COLOR} height={'100%'} flex={1} justifyContent={'center'}>
            <Box margin={5} >
                <Card style={{ padding: 20 }} >
                    <Text fontSize={20} fontWeight={'800'}>Login</Text>
                    <VStack style={styles.loginContainer} >
                        <Input placeholder='User Name' />
                        <Input placeholder='Password' />
                        <Button marginTop={15}>
                            <Text color={'white'} onPress={onLogin}>Login</Text>
                        </Button>
                        <Button>
                            <Text color={'white'}>Register User</Text>
                        </Button>
                    </VStack>
                </Card>
            </Box>
        </Box>
    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        gap: 5,
        marginTop: 15
    }
})