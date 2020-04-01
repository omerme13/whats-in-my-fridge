import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import StyledText from './StyledText';
import { colors } from '../utils/variables';

const gridItem = ({ item, isDeleteState, addToNames, navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { id, name } = item;

    const toggleIsChecked = () => setIsChecked(!isChecked);
    const handlePress = () => {
        if (isDeleteState) {
            toggleIsChecked();
            addToNames(name);
        } else {
            navigation.navigate('ProductDetails', { id });
        }
    }

    const iconName = isDeleteState
        ? (
            `check-box${isChecked ? '' : '-outline-blank'}`
        )
        : null;

    useEffect(() => {
        if (!isDeleteState) {
            setIsChecked(false);
        }
    }, [isDeleteState]);    

    return (
        <View style={styles.gridItem}>
            <View style={styles.deleteButton}>
                <MaterialIcons 
                    name={iconName} 
                    size={30} 
                    onPress={toggleIsChecked}
                />
            </View>
            <TouchableNativeFeedback
                style={{ flex: 1 }}
                onPress={handlePress}
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
