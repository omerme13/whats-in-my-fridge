import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from './StyledText';
import { colors } from '../../utils/variables';

const sortOptions = props => {
    return (
        <View>
            {props.values.map(value => (
                <StyledText
                    key={value}
                    onPress={() => props.setSort(value.replace(/\s/g, ''))}
                    style={styles.sortOption}
                >
                    {value === 'id' ? 'Recently added' : value}
                </StyledText>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    sortOption: {
        color: colors.primaryDark,
        textAlign: 'left',
        paddingLeft: 25,
        paddingVertical: 5,
        textTransform: 'capitalize'
    }
})

export default sortOptions;