import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";

import StyledText from './StyledText';
import { colors } from '../utils/variables';

const gridItem = props => {
    const { id, name } = props.item;

    const buttonHandler = (route, id) => {
        props.navigation.navigate(route, { id })
    };

    return (
        <View style={styles.gridItem}>
            <TouchableNativeFeedback
                style={{ flex: 1 }}
                onPress={() => buttonHandler('ProductDetails', id)}
            >
                <View style={styles.container}>
                    <StyledText style={styles.name}>{name}</StyledText>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 3
    },
    container: {
        flex: 1,
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 0,
        // transform: [{ rotate: '-8deg'}],
    },
    name: {
        letterSpacing: 1,
        fontSize: 22,
        backgroundColor: colors.shadow,
        width: '100%',
        color: 'white',
        textAlign: 'right',
        padding: 20,
        paddingVertical: 4
    }
});

export default gridItem;
