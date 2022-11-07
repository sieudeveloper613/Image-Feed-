import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// import component file from directory
import Avatar from './Avatar'

// import utils file fomr directory
import getAvatarColor from './../utils/getAvatarColor'
import getInitials from './../utils/getInitials'

export default function AuthorRow({
    fullname,
    linkText,
    onPressLinkText,
}){
    return(
        <View style={styles.container}>
            <Avatar
                size={35}
                initials={getInitials(fullname)}
                backgroundColor={getAvatarColor(fullname)}
            />
            <Text style={styles.text} numberOfLines={1}>
                {fullname}
            </Text>

            {!!linkText && (
            // The double negation - !! : dealing with boolean value
                <TouchableOpacity 
                    onPress={onPressLinkText}
                    activeOpacity={0.5} // configure opacity when pressed
                    >
                        <Text numberOfLines={1}>{linkText}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

AuthorRow.propTypes = {
    fullname: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    onPressLinkText: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    text: {
        flex: 1,
        marginHorizontal: 6,
    },
})