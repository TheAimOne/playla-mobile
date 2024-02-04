import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import React from "react";
import { navigationRef } from "../RootNavigation";
import DrawerButton from "./LeftIcon";
import { TopBar } from "./TopBar";

export const headerTitleComponent = (props: any) => <TopBar />;
export const headerLeftDrawerButtonComponent = (props: any) => <DrawerButton />

const HeaderLeftBackButton = (props: any) => {
    const goBack = React.useCallback(() => {
        navigationRef.current?.goBack();
    }, [])

    return <Icon size={50} color={'green.800'}
            as={<MaterialIcons name="chevron-left" />} onPress={goBack} />
};

export default HeaderLeftBackButton