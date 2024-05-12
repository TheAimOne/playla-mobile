import { Box, Button, Input, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import Card from '../../components/ui-components/Card'
import httpClient from '../../config'
import { LOGIN_BG_COLOR } from '../../core/constants'
import { validateEmail } from '../../core/utils'
import { setSession } from '../../store/features/session/session-slice'
import { setUser } from '../../store/features/user/user-slice'

interface LoginProps {
    loginSuccess: () => void
}

const Login = (props: LoginProps) => {
    const dispatch = useDispatch()
    const [userNameOrEmail, setUserNameOrEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>();

    const onLogin = () => {
        console.log(userNameOrEmail, password)
        if (userNameOrEmail && password) {
            const authObj = {
                userId: userNameOrEmail,
                password: password,
                type: validateEmail(userNameOrEmail) ? "email": "mobile",
                deviceType: "MOBILE"
            }
            httpClient.post('user/authenticate', authObj).then(res => {
                const authData = res.data?.data
                const user = res.data?.data?.user;
                dispatch(setUser({
                    isAuthenticated: true,
                    ...user
                }))
                dispatch(setSession({
                    userId: user.userId,
                    accessToken: authData.token,
                    session: {
                        deviceId: authData.deviceId,
                        deviceType: authData.deviceType,
                        refreshToken: authData.refreshToken,
                        refreshTokenExpiry: authData.refreshTokenExpiry
                    }
                }))
            })
        }
    }

    return (
        <Box bg={LOGIN_BG_COLOR} height={'100%'} flex={1} justifyContent={'center'}>
            <Box margin={5} >
                <Card style={{ padding: 20 }} >
                    <Text fontSize={20} fontWeight={'800'}>Login</Text>
                    <VStack style={styles.loginContainer} >
                        <Input placeholder='User Name / Email' onChangeText={setUserNameOrEmail} />
                        <Input placeholder='Password' type='password' onChangeText={setPassword} />
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