import React, { useState } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import Label from "./Label";
import { colors } from '../utils/variables';


const listItem = props => {
    const [isChecked, setIsChecked] = useState(false);
    const { name, label } = props.item;
    const checkListItem = () => setIsChecked(!isChecked);

    const changingStyle = {
        ...styles.listItem,
        backgroundColor: isChecked
            ? 'lightgray'
            : colors.primaryLightest
    };

    return (
        <View style={changingStyle}>
            <View style={styles.data}>
                <StyledText style={styles.name}>{name}</StyledText>
                <Label 
                    style={{ marginRight: 5 }} 
                    show={label ? true : false}
                >
                        {label}
                </Label>
            </View>
            <View style={styles.deleteButton}>
                <MaterialIcons name={`check-box${isChecked ? '' : '-outline-blank'}`} size={23} onPress={checkListItem}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 15,
        paddingLeft: 20
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        marginRight: 15
    },
    quantity: {
        color: colors.textLight,
        fontSize: 16
    },
    sum: {
        fontFamily: "lato-bold"
    },
    name: {
        marginRight: 25
    },
    deleteButton: {
        marginLeft: "auto"
    }
});

export default listItem;
