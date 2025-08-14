import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const EditTextinput = ({ label, value, onChangeText, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                {...props}
                multiline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.TextInput.borderColor,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '90%',
        // height: 55

    },
    label: {
        fontSize: 15,
        paddingLeft: 3,
        color: colors.subFontColor,
    },
    input: {
        fontSize: 16,
        color: colors.fontColor,
        paddingVertical:10
    },
});

export default EditTextinput;
