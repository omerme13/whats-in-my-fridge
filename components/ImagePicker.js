import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from './StyledText';
import { colors } from '../utils/variables';

const imagePicker = props => {
    const takeImage = async () => {
        const pickedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
    
        props.set(pickedImage.uri)
    };

    return (
        <View style={styles.imagePicker}>
            {props.image
                ? <Image source={{ uri: props.image}} style={styles.image} />
                : <StyledText>please choose an image</StyledText>
            }
            
            <View style={styles.buttons}>
                <MaterialCommunityIcons
                    name="camera"
                    size={30}
                    color={colors.secondary}
                    onPress={takeImage}
                    style={{ marginRight: 15 }}
                />
                <MaterialCommunityIcons
                    name="image"
                    size={30}
                    color={colors.secondary}
                    // onPress={takeImage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
    },
    buttons: {
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 90,
        marginVertical: 10,
        borderRadius: 3
    }
});

export default imagePicker;