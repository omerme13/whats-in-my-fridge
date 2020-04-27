import React, { useEffect } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useDispatch } from 'react-redux';

import StyledText from './StyledText';

import { colors } from '../utils/variables';

const settingsSwitch = ({ value, dispatchFunc, setValue, name }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.settingsSwitch}>
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
    )
}

const styles = StyleSheet.create({
    settingsSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingVertical: 30
    }
})

export default settingsSwitch;