import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

import StyledText from '../UI/StyledText';
import { colors } from '../../utils/variables';

const editableText = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(props.children);

    const editHandler = () => setIsEditing(!isEditing);
    const handleTextChange = value => setInputValue(value);

    const textComponent = isEditing
        ? (
            <TextInput
                {...props}
                autoFocus 
                onBlur={editHandler} 
                onChangeText={handleTextChange}
                style={{
                    fontSize: 22, 
                    textTransform: 'capitalize', 
                    color: colors.textLight
                }}
            >
                {inputValue}
            </TextInput>
        ) 
        : (
            <StyledText {...props} onPress={editHandler}>
                {inputValue}
            </StyledText>
        );
        
    const { children } = props;
    useEffect(() => {
        setInputValue(children)
    }, [children])
    
    return textComponent;
};

export default editableText;