import { MaterialIcons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import React from 'react'
import { navigation } from '../RootNavigation'
import { DrawerActions } from '@react-navigation/native'

const DrawerButton = () => {

    const openDrawer = React.useCallback(() => {
        console.log("openDrawer")
        navigation()?.dispatch(DrawerActions.openDrawer)
    }, [])

    return (
        <Icon as={<MaterialIcons name='menu' />} onPress={openDrawer} size={27} />
    )
}

export default DrawerButton