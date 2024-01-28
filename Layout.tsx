import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { navigationRef } from './RootNavigation'
import DrawerLayout from './components/navigators/DrawerNavigator'
import { useAppSelector } from './store/hooks'
import { selectIsAuthenticated } from './store/features/user/user-slice'
import Login from './pages/login/Login'

const Layout = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    return (
        <>
            {!isAuthenticated && <Login loginSuccess={() => { }} />}
            {isAuthenticated &&
                <NavigationContainer ref={navigationRef} >
                    <DrawerLayout />
                </NavigationContainer>}
        </>
    )
}

export default Layout