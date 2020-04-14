import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from './StyledText';
import { colors } from '../utils/variables';

const imagePicker = props => {
    const saveImage = pickedImage => {
        if (!pickedImage) { 
            props.setImage('');
            return;
        }

        props.setImage(pickedImage);
    }

    const imagePickerOptions = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
    };

    const takeImage = async () => {
        try {
            const pickedImage = await ImagePicker.launchCameraAsync(
                imagePickerOptions
            );

            if (!pickedImage.cancelled) {
                saveImage(pickedImage.uri);
            }
        } catch (err) {
            throw err;
        }
    
    };

    const pickImageFromLibrary = async () => {
        try {
            const pickedImage = await ImagePicker.launchImageLibraryAsync({
                ...imagePickerOptions,
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });
        
            if (!pickedImage.cancelled) {
                saveImage(pickedImage.uri);
            }
        } catch (err) {
            throw err;
        }
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
                    onPress={pickImageFromLibrary}
                    style={{ marginRight: 25 }}
                />
                {props.image 
                    ? (
                        <MaterialCommunityIcons
                            name="delete-outline"
                            size={30}
                            color={colors.secondaryDark}
                            onPress={() => saveImage(null)}
                        />
                    ) 
                    : null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        width: '50%',
    },
    image: {
        width: 120,
        height: 90,
        marginVertical: 10,
        borderRadius: 3
    }
});

export default imagePicker;