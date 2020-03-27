import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";


import StyledText from '../StyledText';
import HeaderButton from '../HeaderButton';
import { PRODUCTS } from '../../data/data';

const productDetails = props => {
    const [isFavorable, setIsFavorable] = useState(false);

    const id = props.route.params.id;
    const product =  PRODUCTS.find(prod => prod.id === id);

    const toggleFavorite = () => setIsFavorable(!isFavorable);

    props.navigation.setOptions({
        headerTitle: product.name,
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="favorite"
                    iconName={`ios-star${isFavorable ? '' : '-outline'}`}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    })

    return (
        <View style={styles.productDetails}>
            <StyledText type="title">{product.id}</StyledText>
            <StyledText type="title">{product.name}</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    productDetails: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default productDetails;
