import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from "react-native";

const gridItem = props => {
    const { id, name } = props.item;

    const buttonHandler = (route, id) => {
        props.navigation.navigate({
            routeName: route,
            params: { id }
        });
    };

    return (
        <View style={styles.gridItem}>
            <TouchableNativeFeedback
                style={{ flex: 1 }}
                onPress={() => buttonHandler("CategoryMeals", id)}
            >
                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 15,
    },
    name: {
        fontFamily: "lato-bold",
        fontSize: 22,
        textAlign: "right"
    }
});

export default gridItem;
