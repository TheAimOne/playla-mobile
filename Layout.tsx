import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import 'react-native-gesture-handler'
import { navigationRef } from './RootNavigation'
import DrawerButton from './components/LeftIcon'
import TopBar from './components/TopBar'
import CreateGroup from './pages/create-group/CreateGroup'
import BottomNavigator from './components/BottomNavigator'

const Stack = createNativeStackNavigator();
const DrawerNavigator = createDrawerNavigator();
const options = {
    headerTitle: (props: any) => <TopBar />, headerBackVisible: false,
    headerLeft: (props: any) => <DrawerButton />
}

const DrawerLayout = () => {
    return (<DrawerNavigator.Navigator >
        <DrawerNavigator.Screen name='bottomLayout' component={BottomNavigatorLayout} options={{headerShown: false,title: 'Home'}} />
        <DrawerNavigator.Screen name='createGroup' component={CreateGroup} options={{ headerShown: true, title: 'Create Group' }} />
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