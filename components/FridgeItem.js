import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

import StyledText from "./UI/StyledText";
import Label from "./UI/Label";
import { colors } from "../utils/variables";
import { shortenString, getIncDecResult } from "../utils/convert";

const fridgeItem = ({ 
    item,
    isDeleteState,
    isEditState,
    addDeletionData,
    addQuantityData,
    navigation,
    toggleDeleteState,
    filtered,
    minimal,
    wide
}) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, quantity, expiryDate, unit, photo } = item;
    const [tempQuantity, setTempQuantity] = useState(quantity);

    const defaultPhoto = Asset.fromModule(require('../assets/img/food.jpg')).uri;
    let diffInDays;
    
    if (expiryDate) {
        const diff = Math.floor(expiryDate.getTime() - new Date().getTime());
        diffInDays = Math.round(diff / 1000 / 60 / 60 / 24);
    }

    const toggleIsChecked = () => setIsChecked(!isChecked);

    const handleIncDec = operator => {
        const result = getIncDecResult(tempQuantity, operator, unit);
        if (!result) {
            return;
        }

        setTempQuantity(result);
    };

    const handlePress = () => {
        if (isDeleteState) {
            toggleIsChecked();
            addDeletionData({ id, photo });
        } else {
            navigation.navigate("ProductDetails", { id });
        }
    };

    const handleLongPress = () => {
        if (filtered || isEditState) {
            return;
        }

        if (!isDeleteState) {
            toggleDeleteState();
            toggleIsChecked();
            addDeletionData({ id, photo });   
        }
    }

    const displayedName = shortenString(name,
        wide ? 32 : minimal
            ? isEditState ? 8 : 14
            : isEditState ? 16 : 20
    );

    const displayedLabel = shortenString(label,
        wide ? 32 : minimal ? 7 : 14
    );

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
        if (!filtered) { // excludes filteredFridge
            addQuantityData({id, tempQuantity})
        }

    }, [tempQuantity]);

    useEffect(() => {
        setTempQuantity(quantity);
    }, [quantity])

    return (
        <View style={{ flex: 0.5, overflow: "hidden", borderRadius: 5 }}>
            <TouchableNativeFeedback
                useForeground
                onPress={handlePress}
                onLongPress={handleLongPress}
            >
                <View style={minimal ? styles.fridgeItemMin : styles.fridgeItem}>
                    {!minimal &&
                        <Image
                            source={{
                                uri: photo || defaultPhoto,
                            }}
                            style={styles.image}
                        />
                    }
                    <MaterialCommunityIcons
                        name={iconName}
                        size={30}
                        onPress={toggleIsChecked}
                        style={{
                            ...styles.checkButton,
                            color: isChecked ? colors.secondary : colors.primaryDarkest,
                        }}
                    />
                    <View style={minimal ? styles.nameContainerMin : styles.nameContainer}>
                        <StyledText 
                            type={minimal ? '' : 'title'}
                            style={minimal 
                                ? {...styles.nameMin, paddingLeft: isDeleteState ? 16 : 0}
                                : styles.name
                            }
                        >
                            {displayedName}
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
                    <View style={minimal ? styles.dataMin : styles.data}>
                        <View 
                            style={minimal ? styles.dataItemContainerMin : styles.dataItemContainer}
                        >
                            <StyledText style={minimal ? styles.dataItemMin : styles.dataItem}>
                                {quantity}
                            </StyledText>
                            {!minimal &&
                                <MaterialCommunityIcons
                                    name="scale"
                                    size={30}
                                    onPress={toggleIsChecked}
                                    color={colors.primaryDark}
                                />
                            }
                        </View>
                        {!minimal &&
                            <View style={styles.dataItemContainer}>
                                <StyledText
                                    style={{
                                        ...styles.dataItem,
                                        color: diffInDays > 0 ? colors.primaryDarkest : 'orangered'
                                    }}
                                >
                                    {diffInDays}
                                </StyledText>
                                {expiryDate &&
                                    <MaterialCommunityIcons
                                        name="timer-sand"
                                        size={30}
                                        onPress={toggleIsChecked}
                                        color={colors.primaryDark}
                                    />
                                }
                            </View>
                        }
                    </View>
                    <View style={minimal ? styles.labelContainerMin : styles.labelContainer}>
                        <Label 
                            show={label ? true : false} 
                            onPress={() => {
                                navigation.navigate('FilteredFridge', { label })
                            }}
                            style={minimal ? styles.labelMin : ''}
                        >
                            {displayedLabel}
                        </Label>
                        {minimal &&
                            <Image
                                source={{
                                    uri: photo || defaultPhoto,
                                }}
                                style={styles.imageMin}
                            />
                        }
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
    fridgeItemMin: {
        height: 75,
        width: '90%',
        overflow: "hidden",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        elevation: 1,
        borderRadius: 5,
        backgroundColor: colors.primaryLightest,
        position: 'relative',
    },
    data: {
        flex: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dataMin: {
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        letterSpacing: 1,
        color: colors.primaryDark,
        marginVertical: 0,
        textTransform: 'none',
    },
    nameMin: {
        color: colors.primaryDark,
        textAlign: 'left',
    },
    nameContainer: {
        flex: 2,
        justifyContent: 'center',
        overflow: 'hidden',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    nameContainerMin: {
        flex: 2,
        alignItems: 'flex-start',
    },
    dataItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 15,
    },
    dataItemContainerMin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft: 5,
    },
    dataItem: {
        marginRight: 10,
        fontFamily: 'lato-bold',
        color: colors.primaryDarkest,
    },
    dataItemMin: {
        color: colors.primaryDarkest,
        fontSize: 16
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
    imageMin: {
        width: 55,
        height: 55,
        borderRadius: 50
    },
    editQuantity: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkButton: {
        position: 'absolute',
        left: 2,
        top: 2,
        zIndex: 1,
    },
    labelMin: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    labelContainer: {
        flex: 1,
        paddingBottom: 15,
    },
    labelContainerMin: {
        flex: 3,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default fridgeItem;
