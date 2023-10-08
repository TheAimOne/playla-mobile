import { Box, Button, Input, Text, VStack, View } from 'native-base'
import React from 'react'
import Card from '../../components/Card'
import { StyleSheet } from 'react-native'

const backgroundColor = {
    linearGradient: {
        colors: ['#67B26F', '#4ca2cd'],
        start: [0, 1],
        end: [1, 0]
    }
}

interface LoginProps {
    loginSuccess: () => void
}

const Login = (props: LoginProps) => {
    const login = React.useCallback(() => {
        props.loginSuccess()
    }, [])

    return (
        <Box bg={backgroundColor} height={'100%'} flex={1} justifyContent={'center'}>
            <Box margin={5} >
                <Card padding={4} >
                    <Text fontSize={20} fontWeight={'800'}>Login</Text>
                    <VStack style={styles.loginContainer} >
                        <Input placeholder='User Name' />
                        <Input placeholder='Password' />
                        <Button marginTop={15}>
                            <Text color={'white'} onPress={login}>Login</Text>
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