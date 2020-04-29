import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { colors } from '../../utils/variables';

const spinner = props => (
    <View style={styles.centered}>
        <ActivityIndicator 
            size={props.size ? props.size : 'large'}
            color={props.color ? props.color : colors.primary} 
        />
    </View>
)

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default spinner;