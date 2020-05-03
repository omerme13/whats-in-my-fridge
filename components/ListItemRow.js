import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback, LayoutAnimation, UIManager } from "react-native";
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./UI/StyledText";
import Label from "./UI/Label";
import { updateListItem } from '../store/actions/shoppingList';
import { updateListItemInDB } from '../utils/db';
import { colors } from "../utils/variables";
import { shortenString } from "../utils/convert";


const listItemRow = ({
    item,
    isDeleteState,
    addToIds,
    navigation,
    toggleDeleteState,
    filtered
}) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, isDone } = item;
    const [isDoneState, setIsDoneState] = useState(isDone);
    const dispatch = useDispatch();

    const changingStyle = {
        ...styles.listItemRow,
        backgroundColor: isDone ? "lightgray" : colors.primaryLightest
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

    const setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.easeIn
            },
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
            }
        });
    };

    const toggleIsChecked = () => setIsChecked(!isChecked);

    const toggleIsDone = async () => {
        try {
            setIsDoneState(!isDoneState);
            const updatedListItem = { ...item, isDone: !isDoneState };
            const { id, name, label, isDone } = updatedListItem;
    
            await updateListItemInDB(id, name, label, isDone);
            dispatch(updateListItem(updatedListItem));
            setAnimation();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handlePress = () => {
        if (isDeleteState) {
            toggleIsChecked();
            addToIds(id);
        } else {
            navigation.navigate("ListItem", { id });
        }
    };

    const handleLongPress = () => {
        if (filtered) {
            return;
        }
        
        if (!isDeleteState) {
            toggleDeleteState();
            toggleIsChecked();
            addToIds(id);
        }
    };

    name = shortenString(name,label ? 16 : 25);
    label = shortenString(label, 10);

    const iconName = isDeleteState
        ? `check${!isChecked ? "box-blank-circle-outline" : "-circle"}`
        : null;

    useEffect(() => {
        if (!isDeleteState) {
            setIsChecked(false);
        }
    }, [isDeleteState]);

    return (
        <>
            <TouchableNativeFeedback onPress={handlePress} onLongPress={handleLongPress}>
                <View style={changingStyle}>
                    <View style={styles.data}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {isDeleteState && 
                                <MaterialCommunityIcons
                                    name={iconName}
                                    size={30}
                                    onPress={toggleIsChecked}
                                    style={{ marginRight: 15, color: isChecked ? colors.secondary : colors.primaryDarkest }}
                                />
                            }
                            <StyledText 
                                style={isDone ? styles.nameDone : styles.name}
                            >
                                {name}
                            </StyledText>
                        </View>
                        <Label
                            style={{ marginRight: 5 }}
                            show={label ? true : false}
                            onPress={() => navigation.navigate('FilteredShoppingList', { label })}
                        >
                            {label}
                        </Label>
                    </View>
                    {!isDeleteState &&
                        <View style={styles.doneButton}>
                            <MaterialCommunityIcons
                                name={`checkbox-${
                                    isDone ? 'marked' : 'blank-outline'
                                }`}
                                size={27}
                                onPress={toggleIsDone}
                                color={colors.primaryDarkest}
                            />
                        </View>
                    }
                </View>
            </TouchableNativeFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    listItemRow: {
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
    sum: {
        fontFamily: "lato-bold"
    },
    name: {
        marginRight: 25,
    },
    nameDone: {
        marginRight: 25,
        textDecorationLine: 'line-through',
    },
    doneButton: {
        marginLeft: "auto"
    }
});

export default listItemRow;
