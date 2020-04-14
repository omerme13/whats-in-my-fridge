import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

import StyledText from "./StyledText";
import Label from "./Label";
import { colors } from "../utils/variables";

const gridItem = ({ item, isDeleteState, addToIds, navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, quantity, expiryDate, photo } = item;
    const defaultPhoto = Asset.fromModule(require('../assets/img/food.jpg')).uri;

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
                        style={{ position: 'absolute' ,left: 5, top: 5 }}
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
                    <View style={{ flex: 1 }}>
                        <Label show={label ? true : false}>{label}</Label>
                    </View>
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
        flex: 3,    
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        letterSpacing: 1,
        fontSize: 22,
        color: colors.secondary,
        // backgroundColor: 'red',
        paddingTop: 25
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
