import React from "react";
import { View, StyleSheet, Image, TouchableNativeFeedback } from "react-native";

import StyledText from "./StyledText";
import Card from "./Card";

import { colors } from "../variables";

const productItem = props => {
    const { title, imageUrl, price } = props.details;

    return (
        <Card style={styles.productItem}>
            <TouchableNativeFeedback
                useForeground
                onPress={props.pressed}
            >
                <View style={styles.touchable}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <StyledText type="title" style={styles.title}>
                        {title}
                    </StyledText>
                    <StyledText type="body" style={styles.price}>
                        {price}$
                    </StyledText>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableNativeFeedback>
        </Card>
    );
};

const styles = StyleSheet.create({
    image: {
        height: "50%",
        width: "100%"
    },
    title: {
        color: colors.primary
    },
    price: {
        marginTop: -10,
        color: "gray",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
    touchable: {
        overflow: "hidden",
        borderRadius: 5,
        width: "100%",
        height: '100%'
    }
});

export default productItem;
