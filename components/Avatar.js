import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ColorPropType } from 'deprecated-react-native-prop-types'
import PropTypes from 'prop-types'

export default function Avatar({ initials, size, backgroundColor}){
    const style = {
        width: size,
        height: size,
        borderRadius: size/2,
        backgroundColor,
    }
    return(
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{initials}</Text>
        </View>
    )
}

Avatar.propTypes = {
    initials: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    backgroundColor: ColorPropType.isRequired,
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    }
})

