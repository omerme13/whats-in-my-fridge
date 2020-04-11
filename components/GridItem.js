import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import Label from "./Label";
import { colors } from "../utils/variables";

const gridItem = ({ item, isDeleteState, addToIds, navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, quantity, expiryDate, photo } = item;
    const defaultPhoto = 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80.jpg';

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
            navigation.navigate("ProductDetails", {
                id,
                photo: photo || defaultPhoto
            });
        }
    };

    const iconName = isDeleteState
        ? `check${!isChecked ? "box-blank" : ""}-circle-outline`
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
                    <Image
                        source={{
                            uri: photo || defaultPhoto,
                        }}
                        style={styles.image}
                    />
                    <MaterialCommunityIcons
                        name={iconName}
                        size={30}
                        onPress={toggleIsChecked}
                    />
                    <StyledText type="title" style={styles.name}>
                        {name}
                    </StyledText>
                    <View style={styles.data}>
                        <View style={styles.dataItemContainer}>
                            <StyledText style={styles.dataItem}>
                                {quantity}
                            </StyledText>
                            <MaterialCommunityIcons
                                name="scale"
                                size={30}
                                onPress={toggleIsChecked}
                            />
                        </View>
                        <View style={styles.dataItemContainer}>
                            <StyledText style={{...styles.dataItem, color: diffInDays > 0 ? colors.primaryDark : 'orangered'}}>
                                {diffInDays}
                            </StyledText>
                            <MaterialCommunityIcons
                                name="timer-sand"
                                size={30}
                                onPress={toggleIsChecked}
                            />
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
        position: 'relative'
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
    },
    dataItem: {
        marginRight: 10,
        fontFamily: 'lato-bold',
        color: colors.primaryDark
    },
    image: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 160,
        opacity: 0.2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.primary
    }
});

export default gridItem;
