import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { navigationRef } from './RootNavigation'
import BottomNavigator from './components/BottomNavigator'
import DrawerButton from './components/LeftIcon'
import TopBar from './components/TopBar'
import CreateGroup from './pages/create-group/CreateGroup'
import HeaderLeftBackButton from './components/HeaderComponents'

const DrawerNavigator = createDrawerNavigator();
const options = {
    headerTitle: (props: any) => <TopBar />, headerBackVisible: false,
    headerLeft: (props: any) => <DrawerButton />
}

const DrawerLayout = () => {
    return (<DrawerNavigator.Navigator >
        <DrawerNavigator.Screen name='bottomLayout' component={BottomNavigatorLayout} options={{ headerShown: false, title: 'Home' }} />
        <DrawerNavigator.Screen name='createGroup' component={CreateGroup}
            options={{
                headerShown: true, title: 'Create Group',
                headerLeft: HeaderLeftBackButton
            }} />
    </DrawerNavigator.Navigator>)
}

const BottomNavigatorLayout = () => {
    return <BottomNavigator />
}

const Layout = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef} >
                <DrawerLayout />
            </NavigationContainer>
        </>
    )
}

export default Layout