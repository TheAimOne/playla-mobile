import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { navigationRef } from './RootNavigation'
import DrawerLayout from './components/navigators/DrawerNavigator'
import Login from './pages/login/Login'
import permStorage from './store/PermStorage'
import { SESSION_SLICE, selectIsAuthenticated, selectSession, setSession } from './store/features/session/session-slice'
import { useAppSelector } from './store/hooks'
import LottieView from 'lottie-react-native'
import { Box, Center, Spinner } from 'native-base'
import httpClient from './axios-config'
import { setUser } from './store/features/user/user-slice'
import { AuthState } from './core/types/Auth'

const defaultSplashScreen = () => {
    return <>
        <Center flex={1}    >
            <LottieView
                source={require('./assets/animated_icons/sport_animation_1.json')}
                style={{ width: '100%', height: '100%' }}
                autoPlay
                loop
            />
        </Center>
        <Box bottom={5} ><Spinner size={'xl'} /></Box>
    </>
}

const Layout = () => {
    const [isSessionResolved, setIsSessionResolved] = useState(false);
    const userSession = useAppSelector(selectSession) as AuthState;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("use effect called")
        if (!userSession || !userSession.isAuthenticated) {
            resolveUserSession()
        } else {
            setIsSessionResolved(true)
        }
    }, [])

    const resolveUserSession = useCallback(() => {
        permStorage.load({ key: SESSION_SLICE }).then((session: AuthState) => {
            if (session) {
                console.log("Session is Active for User!")
                dispatch(setSession({ ...session, 
                    accessTokenExpiry: new Date(session.accessTokenExpiry!) }))
                httpClient.get('user?memberId=' + session.userId).then(response => {
                    dispatch(setUser({...response.data}))
                    setIsSessionResolved(true)
                }).catch(err => {
                    console.log(err)
                    setIsSessionResolved(true)
                })
            }
        }).catch(err => {
            setIsSessionResolved(true)
        })
    }, [])

    if (!isSessionResolved) {
        return defaultSplashScreen()
    }

    return (
        <>
            {!userSession.isAuthenticated && <Login loginSuccess={() => { }} />}
            {userSession.isAuthenticated &&
                <NavigationContainer ref={navigationRef} >
                    <DrawerLayout />
                </NavigationContainer>}
        </>
    )
}

export default Layout