import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from './StyledText';
import { colors } from '../utils/variables';

const sortOptions = props => {
    return (
        <View>
            {props.values.map(value => (
                <StyledText
                    key={value}
                    type="title"
                    onPress={() => props.setSort(value.replace(/\s/g, ''))}
                    style={styles.sortOption}
                >
                    {value}
                </StyledText>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    sortOption: {
        color: colors.primaryDark,
        textAlign: 'left',
        paddingLeft: 30
    }
})

export default sortOptions;