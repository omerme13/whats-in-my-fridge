import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';

import StyledText from './StyledText';

import { colors } from '../variables';

const filterSwitch = props => (
    <View style={styles.filterSwitch}>
        <StyledText type="body">{props.name}</StyledText>
        <Switch
            trackColor={{true: colors.primary}}
            thumbColor={colors.secondary}
            value={props.value} 
            onValueChange={value => props.setValue(value)} 
        />
    </View>
)

const styles = StyleSheet.create({
    filterSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})

export default filterSwitch;