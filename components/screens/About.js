import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const about = props => {
    return (
        <View style={styles.about}>
            <StyledText>
                about
            </StyledText>
        </View>
    )
};

const styles = StyleSheet.create({
    about: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default about;