import React, { useState, useEffect } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import StyledText from './StyledText';
import { colors } from '../utils/variables';
import { convertDate } from '../utils/convert';

const datePicker = props => {
    const [date, setDate] = useState(props.expiryDate || new Date());
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        props.set(currentDate);
    };
    
    const showDatepicker = () => setShow(true);
    const formattedExpiryDate = convertDate(date);

    return (
        <View>
            <View>
                <StyledText>
                    {props.expiryDate ? formattedExpiryDate : 'please choose expiry date'}
                </StyledText>
                <MaterialIcons
                    name="date-range"
                    size={30}
                    color={colors.secondary}
                    onPress={showDatepicker}
                />
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default datePicker;
