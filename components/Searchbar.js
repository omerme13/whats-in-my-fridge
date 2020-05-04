
import React, { useState } from 'react';
import { View, TextInput , Keyboard, StyleSheet } from 'react-native';

import { colors } from '../utils/variables';

const searchbar = props => {
    const [searchValue, setSearchValue] = useState('');

    const setHandler = (value) => {
        setSearchValue(value);
        props.set(value);
    };

    return (
        <View style={styles.test}>
            <TextInput
                autoFocus
                value={searchValue}
                onChangeText={text => setHandler(text)}
                placeholder="search..."
                onBlur={() => Keyboard.dismiss()}
                style={{ ...styles.searchbar, ...props.style}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    searchbar: {
        fontSize: 19,
        color: colors.primaryDarker,
    },
    test: {
        backgroundColor: colors.primaryLightest,
        borderRadius: 200,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginRight: 0,
        width: '100%',
        paddingHorizontal: 80,
        marginRight: 15
    }
});

export default searchbar;