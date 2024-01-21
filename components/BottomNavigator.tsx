import React from 'react'
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import TopBar from './TopBar';
import DrawerButton from './LeftIcon';
import Home from '../pages/home/Home';
import SearchGroup from '../pages/search-group/SearchGroup';
import Events from '../pages/events/Events';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupDetail from '../pages/group-detail/GroupDetail';
import HeaderLeftBackButton, { headerLeftDrawerButtonComponent, headerTitleComponent } from './HeaderComponents';
import AddEvent from '../pages/add-event/AddEvent';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type BottomNavigatorConfig = { [key: string]: { icon: string, name: string } }

const iconAndNames: BottomNavigatorConfig = {
    home: { icon: 'groups', name: 'My Groups' },
    search: { icon: 'search', name: 'Search' },
    event: { icon: 'event', name: 'Events' }
}

const getScreenOption = (screenName: string): BottomTabNavigationOptions => ({
    headerTitle: headerTitleComponent,
    headerLeft: headerLeftDrawerButtonComponent,
    tabBarIcon: ({ color, size }) => (
        <Icon as={<MaterialIcons name={iconAndNames[screenName].icon} />} size={size} color={color} />
    ),
})

const tabNavigationOption: BottomTabNavigationOptions = {
    headerTitleAlign: 'center',
    tabBarLabelStyle: { fontSize: 14, color: 'white' },
    tabBarInactiveTintColor: 'white',
    tabBarActiveTintColor: '#eab308',
    tabBarStyle: {
        backgroundColor: '#15803d',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
    },
}

const HomeStackNavigator = () => {
    return (<Stack.Navigator>
        <Stack.Screen name='groupDetail' component={GroupDetail} options={{ headerShown: false }} />
        <Stack.Screen name='addEvent' component={AddEvent} options={{ headerShown: false }} />
    </Stack.Navigator>)
}

const BottomNavigator = () => {
    return (<Tab.Navigator screenOptions={() => (tabNavigationOption)} >
        <Tab.Screen name='home' component={Home} options={getScreenOption('home')} />
        <Tab.Screen name='search' component={SearchGroup} options={getScreenOption('search')} />
        <Tab.Screen name='events' component={Events} options={getScreenOption('event')} />
        <Tab.Screen name='groupStack' component={HomeStackNavigator}
            options={{
                tabBarItemStyle: { display: 'none' }, headerTitle: headerTitleComponent,
                headerLeft: HeaderLeftBackButton
            }} />
    </Tab.Navigator>)
}

export default BottomNavigator