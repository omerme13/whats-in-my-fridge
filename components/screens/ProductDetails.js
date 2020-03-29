import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from 'react-redux';

import StyledText from '../StyledText';
import HeaderButton from '../HeaderButton';
import EditableText from '../EditableText';
import { colors } from "../../utils/variables";

const productDetails = props => {
    const [isToBuy, setIsToBuy] = useState(false);

    const id = props.route.params.id;
    const products = useSelector(state => state.product.productsInFridge);
    const product =  products.find(prod => prod.id === id);
    const { name, label, expiryDate, quantity, photo } = product;

    const toggleFavorite = () => setIsToBuy(!isToBuy);
   
    props.navigation.setOptions({
        headerTitle: name,
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="favorite"
                    iconName={`${isToBuy ? 'remove' : 'add'}-shopping-cart`}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    });

    const [mm, dd, yy] = expiryDate.toLocaleDateString().split('/');
    const formattedExpiryDate = `${dd}-${mm}-${yy}`;

    return (
        <View style={styles.productDetails}>
            <View style={styles.top}>
                <StyledText style={styles.label}>{label}</StyledText>
            </View>
            <View style={styles.bottom}>              
                <EditableText type="title" style={styles.name}>{name}</EditableText>
                <StyledText style={styles.quantity}>{quantity} pcs</StyledText>
                <StyledText style={styles.expiryDate}>use before {formattedExpiryDate}</StyledText>
                <EditableText>{'test'}</EditableText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productDetails: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    top: {
        // backgroundColor: 'red',
        flex: 1,
        width: '80%',
        padding: 15
    },
    bottom: {
        // backgroundColor: 'blue',
        alignItems: 'center',
        flex: 5,
        width: '80%'
    },
    label: {
        fontFamily: 'lato-bold',
        textTransform: 'capitalize',
        backgroundColor: colors.primaryLight,
        marginRight: 'auto',
        padding: 5,
        borderRadius: 3,
        elevation: 3
    },
    name: {
        color: colors.secondary
    },
    quantity: {
        fontSize: 18,
        color: colors.textLight
    },
    expiryDate: {

    }
});

export default productDetails;
