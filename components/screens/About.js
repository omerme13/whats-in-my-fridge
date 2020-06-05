import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import StyledText from '../UI/StyledText';
import { colors } from '../../utils/variables';

const about = props => {
    return (
        <View style={styles.about}>
            <StyledText type="title">what's in my fridge</StyledText>
            <Image
                source={require('../../assets/logo-green.png')}
                style={styles.icon}
            />
            <StyledText style={styles.version}>version 1.0.0</StyledText>
            <StyledText style={styles.copy}>Developed by Omer Menachem.</StyledText>
            <StyledText style={styles.copy}>All rights reserved ©2020.</StyledText>
        </View>
    )
};

const styles = StyleSheet.create({
    about: {
        flex: 1,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    version: {
        color: colors.primaryDarkest,
        marginBottom: 30
    },
    icon: {
        width: 100,
        height: 100,
        marginTop: 30
    },
    copy: {
        color: colors.textLight,
        fontSize: 16,
        marginVertical: 0
    }
});

export default about;