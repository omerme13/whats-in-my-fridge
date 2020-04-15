import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import Label from "./Label";
import { addToShoppingList } from '../store/actions/shoppingList';
import { updateListItemInDB } from '../utils/db';
import { colors } from "../utils/variables";

const listItemRow = ({ item, isDeleteState, addToIds, navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    let { id, name, label, isDone } = item;
    const [isDoneState, setIsDoneState] = useState(isDone);
    const dispatch = useDispatch();

    const changingStyle = {
        ...styles.listItemRow,
        backgroundColor: isDone ? "lightgray" : colors.primaryLightest
    };

    const toggleIsChecked = () => setIsChecked(!isChecked);

    const toggleIsDone = async () => {
        try {
            setIsDoneState(!isDoneState);
            const updatedListItem = { ...item, isDone: !isDoneState };
            const { id, name, label, isDone } = updatedListItem;
    
            await updateListItemInDB(id, name, label, isDone);
            dispatch(addToShoppingList(updatedListItem));
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

    name = name.length > 20 ? name.slice(0,20) + '...' : name;

    const iconName = isDeleteState
    ? `check${!isChecked ? "box-blank" : ""}-circle-outline`
    : null;

    useEffect(() => {
        if (!isDeleteState) {
            setIsChecked(false);
        }
    }, [isDeleteState]);

    return (
        <>
            <TouchableNativeFeedback onPress={handlePress}>
                <View style={changingStyle}>
                    <View style={styles.data}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {isDeleteState && 
                                <MaterialCommunityIcons
                                    name={iconName}
                                    size={30}
                                    onPress={toggleIsChecked}
                                    style={{ marginRight: 15 }}
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
                        <View style={styles.deleteButton}>
                            <MaterialCommunityIcons
                                name={`checkbox-${
                                    isDone ? 'marked' : 'blank-outline'
                                }`}
                                size={27}
                                onPress={toggleIsDone}
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
    nameDone: {
        marginRight: 25,
        textDecorationLine: 'line-through',
    },
    deleteButton: {
        marginLeft: "auto"
    }
});

export default listItemRow;
