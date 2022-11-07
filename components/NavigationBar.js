import React from "react";
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function NavigationBar({ title, leftText, onPressLeftText }){
    // type something here
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftText} onPress={onPressLeftText}>
                <Text>{leftText}</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

NavigationBar.propTypes = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
    title: '',
    leftText: '',
    onPressLeftText: () => {},
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftText: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '500' // fontWeight must be a string
    },
});