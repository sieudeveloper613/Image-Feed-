import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet } from 'react-native'

export default class CommentInput extends React.Component{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        placeholder: '',
    };

    state = {
        text: '',
    };

    handleChangeText = text => {
        this.setState({ text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if(!text) return;
        
        onSubmit(text);
        this.setState({ text: ''})
    }

    render(){
        const { placeholder } = this.props;
        const { text } = this.state;
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={text}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                    // autoCapitalize='none' // For capitalizing characters
                    // autoCorrect={false} // enable or not auto correct
                    // editable={null} // enable or not text field
                    // keyboardType='default' // type of keyboard to display
                    // multiline={1} // allow multiple lines of input text


                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth, // render the thinnest possible line
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        height: 60,
    },
    input: {
        flex: 1,
    },
})