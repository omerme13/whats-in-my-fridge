import React, { useEffect } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useDispatch } from 'react-redux';

import StyledText from './UI/StyledText';

import { colors } from '../utils/variables';

const settingsSwitch = ({ value, dispatchFunc, setValue, name, description }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.settingsSwitch}>
            <View style={styles.header}>
                <StyledText>{name}</StyledText>
                <Switch
                    trackColor={{ true: colors.primary }}
                    thumbColor={colors.secondary}
                    value={value} 
                    onValueChange={receivedValue => {
                        setValue(receivedValue);
                        dispatch(dispatchFunc(receivedValue))
                    }} 
                />
            </View>
            <StyledText style={styles.description}>{description}</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsSwitch: {
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        color: 'gray',
        fontSize: 16
    }
});

export default settingsSwitch;