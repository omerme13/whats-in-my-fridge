import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from './StyledText';

const emptyScreenMsg = props => (
    <View style={styles.emptyScreenMsg}>
        <StyledText>{props.message}</StyledText>
        <MaterialCommunityIcons
            name={props.iconName}
            size={80}
            color="lightgray"
        />
    </View>
);

const styles = StyleSheet.create({
    emptyScreenMsg: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default emptyScreenMsg;