import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Keyboard } from "react-native";

import StyledText from "./StyledText";
import FormInput from "./FormInput";
import { colors } from '../utils/variables';

const autocompleteFormInput = props => {
    const [defValue, setDefValue] = useState(props.input);
    const [isShown, setIsShown] = useState(false);

    const setHandler = (text, isPressed) => {
        setDefValue(text);
        props.set(text);

        if (isPressed) {
            setIsShown(false);
            Keyboard.dismiss();
        } else {
            setIsShown(text ? true : false);
        }
    };

    const renderItem = item => (
        item.includes(defValue) &&
            <TouchableOpacity
                onPress={() => setHandler(item, true)}
                key={item}
            >
                <StyledText>{item}</StyledText>
            </TouchableOpacity>
    );

    return (

        <View style={{ height: 'auto' }}>
            <FormInput
                {...props}
                input={defValue}
                set={text => setHandler(text)}
                onBlur={() => setIsShown(false)}
            />
            {isShown &&
                <View style={styles.options}>
                    {Array.from(new Set(props.data)).map(renderItem)}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    options: {
        borderRadius: 5,
        borderColor: colors.primaryDark,
        backgroundColor: colors.primaryLightest,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: -30
    }
});

export default autocompleteFormInput;
