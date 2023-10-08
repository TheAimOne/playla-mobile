import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { navigationRef } from './RootNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TopBar from './components/TopBar'
import SearchGroup from './pages/search-group/SearchGroup'
import Events from './pages/events/Events'
import CreateGroup from './pages/create-group/CreateGroup'
import Footer from './components/Footer'
import Home from './pages/home/Home'

const Stack = createNativeStackNavigator()
const options = { headerTitle: (props: any) => <TopBar />, headerBackVisible: false}


const Layout = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen name='home' component={Home} options={options} />
                    <Stack.Screen name='search' component={SearchGroup} options={options} />
                    <Stack.Screen name='events' component={Events} options={options} />
                    <Stack.Screen name='createGroup' component={CreateGroup} options={options} />
                </Stack.Navigator>
            </NavigationContainer>
            <Footer />
        </>
    )
}

export default Layout