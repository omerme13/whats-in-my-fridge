import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import Label from "./Label";
import { colors } from "../utils/variables";

const gridItem = ({ item, isDeleteState, addToIds, navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { id, name, label, quantity, expiryDate } = item;

    let diffInDays;
    if (expiryDate) {
        const diff = Math.floor(expiryDate.getTime() - new Date().getTime());
        diffInDays = Math.round(diff / 1000 / 60 / 60 / 24);
    }

    const toggleIsChecked = () => setIsChecked(!isChecked);

    const handlePress = () => {
        if (isDeleteState) {
            toggleIsChecked();
            addToIds(id);
        } else {
            navigation.navigate("ProductDetails", { id });
        }
    };

    const iconName = isDeleteState
        ? `check-box${isChecked ? "" : "-outline-blank"}`
        : null;

    useEffect(() => {
        if (!isDeleteState) {
            setIsChecked(false);
        }
    }, [isDeleteState]);

    return (
        <View style={{ flex: 1, overflow: "hidden", borderRadius: 5 }}>
            <TouchableNativeFeedback
                useForeground
                onPress={handlePress}
            >
                <View style={styles.gridItem}>
                    <MaterialIcons
                        name={iconName}
                        size={30}
                        onPress={toggleIsChecked}
                    />
                    <StyledText type="title" style={styles.name}>
                        {name}
                    </StyledText>
                    <View style={styles.data}>
                        <View style={styles.dataItemContainer}>
                            <MaterialCommunityIcons
                                name="numeric"
                                size={30}
                                onPress={toggleIsChecked}
                            />
                            <StyledText style={styles.dataItem}>
                                {quantity}
                            </StyledText>
                        </View>
                        <View style={styles.dataItemContainer}>
                            <MaterialCommunityIcons
                                name="timer-sand"
                                size={30}
                                onPress={toggleIsChecked}
                            />
                            <StyledText style={{...styles.dataItem, color: diffInDays > 0 ? colors.primary : 'orangered'}}>
                                {diffInDays}
                            </StyledText>
                        </View>
                    </View>
                    <Label show={label ? true : false}>{label}</Label>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 250,
        borderRadius: 5,
        overflow: "hidden",
        elevation: 3,
        backgroundColor: 'white',
        paddingBottom: 10,
        justifyContent: 'center',
    },
    data: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    name: {
        letterSpacing: 1,
        fontSize: 22,
        color: colors.secondary
    },
    dataItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: 15,
        // backgroundColor: 'red'
    },
    dataItem: {
        marginLeft: 10,
        fontFamily: 'lato-bold',
        color: colors.primary
    }
});

export default gridItem;
