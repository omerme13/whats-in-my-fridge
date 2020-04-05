import React, { useState } from "react";
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from "@expo/vector-icons";

import StyledText from '../StyledText';
import HeaderButton from '../HeaderButton';
import Label from '../Label';
import ListItem from '../../models/listItem';
import Product from '../../models/product';
import { colors } from "../../utils/variables";
import { convertDate } from "../../utils/convert";
import { addToShoppingList, deleteFromShoppingList } from '../../store/actions/shoppingList';
import { updateProduct } from '../../store/actions/product';

const productDetails = props => {
    const dispatch = useDispatch();
    
    const id = props.route.params.id;
    const products = useSelector(state => state.product.productsInFridge);
    const product =  products.find(prod => prod.id === id);
    const { name, label, expiryDate, quantity, toBuy, photo } = product;
    const [isToBuy, setIsToBuy] = useState(toBuy);

    const toggleToBuy = () => {
        const newListItem = new ListItem(name, name, quantity, label);
        const updatedProduct = new Product(id, name, label, expiryDate, quantity, !isToBuy);
        
        dispatch(addToShoppingList(newListItem));
        dispatch(updateProduct(updatedProduct));
        
        if (isToBuy) {
            dispatch(deleteFromShoppingList(name));
        }
        setIsToBuy(!isToBuy);
    };

    const editProduct = () => {
        props.navigation.navigate('Product', { id });
    };

    const formattedExpiryDate = convertDate(expiryDate);

    props.navigation.setOptions({
        headerTitle: name,
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="favorite"
                    iconName="edit"
                    onPress={editProduct}
                />
            </HeaderButtons>
        )
    });

    return (
        <View style={styles.productDetails}>
            <View style={styles.top}>
                <MaterialIcons
                    name={`${isToBuy ? 'remove' : 'add'}-shopping-cart`}
                    size={23}
                    color={colors.secondary}
                    onPress={toggleToBuy}
                />
                <Label show={label ? true : false}>{label}</Label>
            </View>
            <View style={styles.bottom}>              
                <StyledText type="title" style={styles.name}>{name}</StyledText>
                <StyledText style={styles.quantity}>{quantity} pcs</StyledText>
                {expiryDate 
                ? (
                    <StyledText style={styles.expiryDate}>
                        Use before <StyledText style={{fontFamily: 'lato-bold'}}>
                            {formattedExpiryDate}
                            </StyledText>
                    </StyledText>
                ) : null}
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
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '80%',
        padding: 15
    },
    bottom: {
        alignItems: 'center',
        flex: 5,
        width: '80%'
    },
    name: {
        color: colors.secondary
    },
    quantity: {
        // fontSize: 18,
        color: colors.textLight
    },
    expiryDate: {

    }
});

export default productDetails;
