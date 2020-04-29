import React from 'react';
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from '../utils/variables';

const roundButton = props => {
    return (
        <>
            {props.show &&
                <View style={{ ...styles.roundButton, ...props.style }}>
                    <MaterialIcons
                        name={props.name}
                        size={props.size || 30}
                        color="whitesmoke"
                        onPress={props.onPress}
                    />
                </View>
            }
        </>
    )
};

const styles = StyleSheet.create({
    roundButton: {
        backgroundColor: colors.secondary,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        marginRight: 15,
        elevation: 5,
        marginLeft: 'auto'
    }
});

export default roundButton;