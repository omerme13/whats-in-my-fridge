import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

import StyledText from "./UI/StyledText";
import Label from "./UI/Label";
import { colors } from "../utils/variables";
import { shortenString } from "../utils/convert";

const fridgeItem = ({ 
    item,
    isDeleteState,
    isEditState,
    addDeletionData,
    addQuantityData,
    navigation,
    toggleDeleteState,
    filtered
}) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, quantity, expiryDate, photo } = item;
    const [tempQuantity, setTempQuantity] = useState(quantity);

    const defaultPhoto = Asset.fromModule(require('../assets/img/food.jpg')).uri;
    let diffInDays;
    
    if (expiryDate) {
        const diff = Math.floor(expiryDate.getTime() - new Date().getTime());
        diffInDays = Math.round(diff / 1000 / 60 / 60 / 24);
    }

    const toggleIsChecked = () => setIsChecked(!isChecked);

    const handleIncDec = (op) => {
        if (tempQuantity === 1 && op !== '+') {
            return;
        }

        op === '+'
            ? setTempQuantity(tempQuantity + 1)
            : setTempQuantity(tempQuantity - 1)
    }

    const handlePress = () => {
        if (isDeleteState) {
            toggleIsChecked();
            addDeletionData({ id, photo });
        } else {
            navigation.navigate("ProductDetails", { id });
        }
    };

    const handleLongPress = () => {
        if (filtered) {
            return;
        }

        if (!isDeleteState) {
            toggleDeleteState();
            toggleIsChecked();
            addDeletionData({ id, photo });   
        }
    }

    name = shortenString(name,isEditState ? 16 : 20);
    label = shortenString(label, 14);

    const iconName = isDeleteState
        ? `check${!isChecked ? "box-blank-circle-outline" : "-circle"}`
        : null;

    useEffect(() => {
        if (!isDeleteState) {
            setIsChecked(false);
        }
        if (!isEditState) {
            setTempQuantity(quantity);
        }
    }, [isDeleteState, isEditState]);

    useEffect(() => {
        if (addQuantityData) { // excludes filteredFridge
            addQuantityData({id, tempQuantity})
        }
    }, [tempQuantity]);

    return (
        <View style={{ flex: 0.5, overflow: "hidden", borderRadius: 5 }}>
            <TouchableNativeFeedback
                useForeground
                onPress={handlePress}
                onLongPress={handleLongPress}
            >
                <View style={styles.fridgeItem}>
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
                        style={{
                            ...styles.checkButton,
                            color: isChecked ? colors.secondary : colors.primaryDarkest
                        }}
                    />
                    <View style={styles.nameContainer}>
                        <StyledText type="title" style={styles.name}>
                            {name}
                        </StyledText>
                        {isEditState &&
                            <View style={{ ...styles.dataItemContainer, justifyContent: 'center' }}>
                                <MaterialCommunityIcons 
                                    name="minus-circle-outline" 
                                    size={30} 
                                    color={colors.secondary}
                                    onPress={() => handleIncDec('-')}
                                    style={{ marginRight: 5 }}
                                />
                                <StyledText>{tempQuantity}</StyledText>
                                <MaterialCommunityIcons 
                                    name="plus-circle-outline" 
                                    size={30} 
                                    color={colors.secondary} 
                                    onPress={() => handleIncDec('+')}
                                    style={{ marginLeft: 5 }}
                                />
                            </View>
                        }
                    </View>
                    <View style={styles.data}>
                        <View style={styles.dataItemContainer}>
                            <StyledText style={styles.dataItem}>
                                {quantity}
                            </StyledText>
                            <MaterialCommunityIcons
                                name="scale"
                                size={30}
                                onPress={toggleIsChecked}
                                color={colors.primaryDarkest}
                            />
                        </View>
                        <View style={styles.dataItemContainer}>
                            <StyledText
                                style={{
                                    ...styles.dataItem,
                                    color: diffInDays > 0 ? colors.primaryDark : 'orangered'
                                }}
                            >
                                {diffInDays}
                            </StyledText>
                            {expiryDate &&
                                <MaterialCommunityIcons
                                    name="timer-sand"
                                    size={30}
                                    onPress={toggleIsChecked}
                                    color={colors.primaryDarkest}
                                />
                            }
                        </View>
                    </View>
                    <View style={{flex: 1, paddingBottom: 15}}>
                        <Label 
                            show={label ? true : false} 
                            onPress={() => {
                                navigation.navigate('FilteredFridge', { label })}
                            }
                        >
                            {label}
                        </Label>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    fridgeItem: {
        margin: 15,
        height: 250,
        borderRadius: 5,
        overflow: "hidden",
        elevation: 3,
        backgroundColor: 'white',
        paddingBottom: 10,
        justifyContent: 'center',
        position: 'relative',
    },
    data: {
        flex: 4,    
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    name: {
        letterSpacing: 1,
        color: colors.primaryDark,
        marginVertical: 0,
        textTransform: 'none'
    },
    nameContainer: {
        flex: 2,
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 15
    },
    dataItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 15,
    },
    dataItem: {
        marginRight: 10,
        fontFamily: 'lato-bold',
        color: colors.primaryDark,
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
        backgroundColor: colors.primary,
    },
    editQuantity: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkButton: {
        position: 'absolute',
        left: 2,
        top: 2,
        zIndex: 1
    }
});

export default fridgeItem;
