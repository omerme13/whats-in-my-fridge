import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import StyledText from "./StyledText";

const formInput = props => {
    const [inputValue, setInputValue] = useState(props.input);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const validateInput = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isInputValid = true;

        if (props.required && text.trim().length === 0) {
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

    const setHandler = text => {
        const isInputValid = validateInput(text);

        setIsValid(isInputValid);
        setIsTouched(true);
        setInputValue(text);
        props.set(text, isInputValid);
    };

    return (
        <View style={styles.formInput}>
            <StyledText type="title" style={{textAlign: 'left'}}>
                {props.label}
            </StyledText>
            <TextInput
                {...props}
                value={inputValue.toString()} // in case there is a number(price/quantity) it becomes invalid
                style={{...styles.input, ...props.style}}
                onChangeText={text => setHandler(text)}
            />
            {!isValid && isTouched && (
                <StyledText style={styles.error}>
                    Please enter a valid {props.label}
                </StyledText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formInput: {
        width: "100%"
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
