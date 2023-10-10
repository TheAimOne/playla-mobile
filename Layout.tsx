import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import 'react-native-gesture-handler'
import { navigationRef } from './RootNavigation'
import Footer from './components/Footer'
import DrawerButton from './components/LeftIcon'
import TopBar from './components/TopBar'
import Events from './pages/events/Events'
import Home from './pages/home/Home'
import SearchGroup from './pages/search-group/SearchGroup'
import CreateGroup from './pages/create-group/CreateGroup'

const Stack = createNativeStackNavigator();
const DrawerNavigator = createDrawerNavigator();
const options = {
    headerTitle: (props: any) => <TopBar />, headerBackVisible: false,
    headerLeft: (props: any) => <DrawerButton />
}

const DrawerLayout = () => {
    return (<DrawerNavigator.Navigator >
        <DrawerNavigator.Screen name='stack' component={NavigatorLayout} options={{headerShown: false,title: 'Home'}} />
        <DrawerNavigator.Screen name='createGroup' component={CreateGroup} options={{ headerShown: true, title: 'Create Group' }} />
    </DrawerNavigator.Navigator>)
}

const NavigatorLayout = () => {
    return (<Stack.Navigator>
        <Stack.Screen name='home' component={Home} options={options} />
        <Stack.Screen name='search' component={SearchGroup} options={options} />
        <Stack.Screen name='events' component={Events} options={options} />
    </Stack.Navigator>)
}

const Layout = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef} >
                <DrawerLayout />
                <Footer />
            </NavigationContainer>
        </>
    )
}

export default Layout