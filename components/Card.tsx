import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface ICardProps extends InterfaceBoxProps {
    children: React.ReactNode
    style?: StyleProp<ViewStyle> | undefined
}

const Card = (props: ICardProps) => {
    
  return (
    <View style={[styles.cardContainer, props.style]}>
        {props.children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        overflow: 'hidden',
        borderColor: "coolGray.300",
        borderRadius: 4,
        padding: 4,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
    }
})