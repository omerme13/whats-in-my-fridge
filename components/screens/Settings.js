import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const settings = props => {
    return (
        <View style={styles.settings}>
            <StyledText>
                Settings
            </StyledText>
        </View>
    )
};

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default settings;