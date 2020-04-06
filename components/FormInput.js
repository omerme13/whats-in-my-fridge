import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./StyledText";
import { colors } from '../utils/variables';


const formInput = props => {
    const [inputValue, setInputValue] = useState(props.input);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const validateInput = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isInputValid = true;

        if (props.required && !text.trim().length) {
            isInputValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isInputValid = false;
        }
        if (props.min != null && +text < props.min) {
            isInputValid = false;
        }
        if (props.max != null && +text > props.max) {
            isInputValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isInputValid = false;
        }

        return isInputValid;
    };

    const isNumberInput = props.keyboardType === 'number-pad';

    const roundDecimal = number => {
        if (isNaN(number)) {
            return '';
        }
        
        return number % 1 === 0
        ? number
        : (+number).toFixed(1);
    };

    const setHandler = text => {
        if (isNumberInput) {
            text = roundDecimal(text);
        }

        const isInputValid = validateInput(text);
        setIsValid(isInputValid);
        setIsTouched(true);
        setInputValue(text);
        props.set(text, isInputValid);
    };


    const changeByOne = operator => {
        if (inputValue <= 1 && operator === '-') {
            return;
        }

        setInputValue(roundDecimal(inputValue));
        const op = operator === '+' ? 1 : -1;

        setIsValid(true);
        setIsTouched(true);
        setInputValue(+inputValue + op);
        props.set(+inputValue + op, true);  // incremented/decremented 1 because the last operation doesn't happen
    }
    

    return (
        <View style={{ width: isNumberInput ? '50%' : '100%' }}>
            <StyledText type="title" style={{textAlign: 'left'}}>
                {props.label}
            </StyledText>
            <View style={isNumberInput ? styles.formInputContainerNum : ''}>
                {isNumberInput && 
                    <MaterialCommunityIcons 
                        name="minus-circle-outline" 
                        size={26} 
                        color={colors.secondary} 
                        onPress={() => changeByOne('-')} 
                        style={{marginLeft: 5, marginRight: 'auto'}} 
                    />
                }
                <TextInput
                    {...props}
                    value={inputValue.toString()} // in case there is a number(price/quantity) it becomes invalid
                    style={{...styles.input, marginBottom: isNumberInput ? 0 : 25}}
                    onChangeText={text => setHandler(text)}
                />
                {isNumberInput && 
                    <MaterialCommunityIcons 
                        name="plus-circle-outline" 
                        size={26} 
                        color={colors.secondary} 
                        onPress={() => changeByOne('+')} 
                        style={{marginRight: 5, marginLeft: 'auto'}} 

                    />
                }
            </View>
            {!isValid && isTouched && (
                <StyledText style={styles.error}>
                    Please enter a valid {props.label}
                </StyledText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formInputContainerNum: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.primary,
        borderRadius: 200,
        height: 40,
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginBottom: 25,
        fontFamily: 'lato',
        fontSize: 19
    },
    error: {
        color: 'orangered',
        marginTop: -20
    }
});

export default formInput;
