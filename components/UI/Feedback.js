import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import StyledText from './StyledText';
import { colors } from '../../utils/variables';
const feedback = props => {
    return (
        <>
            {props.show &&
                <Animatable.View
                    style={styles.feedback}
                    animation="fadeIn"
                    direction="alternate"
                    iterationCount={2}
                    iterationDelay={750}
                    duration={250}
                >
                    <StyledText>{props.message}</StyledText>
                </Animatable.View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    feedback: {
        backgroundColor: colors.primaryLightest,
        position: 'absolute',
        top: 80,
        elevation: 3,
        zIndex: 1,
        borderRadius: 5,
        padding: 10
    }
});

export default feedback;