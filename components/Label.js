import React from 'react';
import { StyleSheet } from 'react-native';

import StyledText from './StyledText'; 
import { colors } from '../utils/variables';

const label = props => {
    const getProductsByLabel = labelName => {
        //TODO
    };

    return (
        <>
        {props.show &&
            <StyledText 
                style={{...styles.label, ...props.style}} 
                onPress={() => getProductsByLabel(props.children)}
            >
                {props.children}
            </StyledText>
        }
        </>
    )
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'lato-bold',
        textTransform: 'capitalize',
        backgroundColor: colors.primaryLight,
        marginRight: 'auto',
        marginLeft: 15,
        padding: 5,
        borderRadius: 3,
        elevation: 3,
        fontSize: 15
    }
});

export default label;