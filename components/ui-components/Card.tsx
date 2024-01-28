import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ICardProps extends InterfaceBoxProps {
    children: React.ReactNode
    style?: StyleProp<ViewStyle> | undefined,
    disableShadow?: boolean
}

const Card = (props: ICardProps) => {
    const shadowClass = props.disableShadow ? {} : styles.shadow

    return (
        <View style={[styles.cardContainer, shadowClass, props.style]}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 4,
        padding: 4,
        backgroundColor: 'white'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    }
})