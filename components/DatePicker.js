import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

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
    
    const deleteDate = () => {
        setDate(null);
        props.set(null);
    };

    const showDatePicker = () => setShow(true);
    const formattedExpiryDate = convertDate(date);
    
    return (
        <View>
            <View>
                <StyledText>
                    {props.expiryDate
                        ? formattedExpiryDate
                        : 'please choose expiry date'
                    }
                </StyledText>
                <View style={styles.buttons}>
                    <MaterialIcons
                        name="date-range"
                        size={30}
                        color={colors.secondary}
                        onPress={showDatePicker}
                    />
                    {props.expiryDate 
                        ? (
                            <MaterialCommunityIcons
                                name="delete-outline"
                                size={30}
                                color={colors.secondaryDark}
                                onPress={deleteDate}
                                style={{ marginLeft: 25 }}
                            />
                        ) 
                        : null
                    }
                </View>
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

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        width: '50%',
    }
});

export default datePicker;
