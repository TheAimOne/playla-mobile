import { MaterialIcons } from '@expo/vector-icons'
import { Box, Icon, Input } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const SearchGroup = () => {

    return (
        <Box style={styles.container} >
            <Box style={styles.inputContainer} >
                <Input w={'80%'} style={styles.searchInput} placeholder='Search Group'
                    InputLeftElement={<Icon as={<MaterialIcons name='search' />} size={5} ml="2" />}
                ></Input>
            </Box>
        </Box>
    )
}

export default SearchGroup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        fontSize: 16
    }
});