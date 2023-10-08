import { Box, StyledProps } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'
import React from 'react'
import { StyleSheet } from 'react-native'

interface ICardProps extends InterfaceBoxProps {
    children: React.ReactNode
}

const Card = (props: ICardProps) => {
  return (
    <Box rounded={"lg"} style={styles.cardContainer} {...props}>
        {props.children}
    </Box>
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