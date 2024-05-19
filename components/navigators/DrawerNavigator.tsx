import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Box, Button, Center, HStack } from "native-base";
import React, { RefObject, useRef } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../core";
import CreateGroup from "../../pages/create-group/CreateGroup";
import { clearUser } from "../../store/features/user/user-slice";
import BottomNavigator from "./BottomNavigator";
import { CustomAlertDialog, ICustomAlertRef } from "../ui-components/CustomAlertDialog";
import HeaderLeftBackButton from "../HeaderComponents";
import { Logo } from "../TopBar";
import { clearSession } from "../../store/features/session/session-slice";
import { AuthState } from "../../core/types/Auth";

const DrawerNavigator = createDrawerNavigator();

const BottomNavigatorLayout = () => {
    return <BottomNavigator />
}


const DrawerLayout = () => {
    const alertRef = useRef<ICustomAlertRef>();
    const dispatch = useDispatch()

    const openLogoutAlert = React.useCallback(() => {
        alertRef.current?.showAlert("Are you sure you want to Logout?", "warn");
    }, [])

    const onLogout = React.useCallback(() => {
        dispatch(clearUser({} as User))
        dispatch(clearSession({} as AuthState))
    }, [])

    return (<DrawerNavigator.Navigator drawerContent={props => (
        <>
            <CustomAlertDialog ref={alertRef as RefObject<ICustomAlertRef>} title='Logout Confirmation' alertFooter={
                <HStack space={2}>
                    <Button onPress={onLogout}> Yes </Button>
                    <Button onPress={() => alertRef.current?.closeAlert()}> No </Button>
                </HStack>
            } />
            <DrawerContentScrollView {...props}>
                <Box margin={5}>
                    <Logo />
                </Box>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={openLogoutAlert} />
            </DrawerContentScrollView>
        </>
    )} >
        <DrawerNavigator.Screen name='bottomLayout' component={BottomNavigatorLayout} options={{ headerShown: false, title: 'Home' }} />
        <DrawerNavigator.Screen name='createGroup' component={CreateGroup}
            options={{
                headerShown: true, title: 'Create Group',
                headerLeft: HeaderLeftBackButton
            }} />
    </DrawerNavigator.Navigator>)
}

export default DrawerLayout
