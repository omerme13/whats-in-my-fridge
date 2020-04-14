import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

import StyledText from '../StyledText';
import HeaderButton from '../HeaderButton';
import Label from '../Label';
import ListItem from '../../models/listItem';
import Product from '../../models/product';
import { colors } from "../../utils/variables";
import { convertDate } from "../../utils/convert";
import { addToShoppingList, deleteFromShoppingList } from '../../store/actions/shoppingList';
import { updateProduct } from '../../store/actions/product';
import { updateProductInDB, insertListItemToDB, deleteListItemsFromDB } from '../../utils/db';
import { convertToSqlDate } from '../../utils/convert';

const productDetails = props => {
    const id = props.route.params.id;
    const products = useSelector(state => state.product.productsInFridge);
    const product =  products.find(prod => prod.id === id);
    const { name, label, expiryDate, quantity, unit, toBuy, photo, listItemId } = product;
    const [isToBuy, setIsToBuy] = useState(toBuy);
    
    const defaultPhoto = Asset.fromModule(require('../../assets/img/food.jpg')).uri;
    const [image, setImage] = useState(photo || defaultPhoto)

    const dispatch = useDispatch();

    const toggleToBuy = async () => {
        try {
            const updatedProduct = new Product(id, name, label, expiryDate, quantity, unit, !isToBuy, image);

            if (!toBuy) {
                const dbResult = await insertListItemToDB(name, label);
                const newListItem = new ListItem(dbResult.insertId, name, label);
                const updatedProductWithListItem = {...updatedProduct, listItemId: dbResult.insertId };
    
                await updateProductInDB(id, name, label, convertToSqlDate(expiryDate), quantity, unit, !isToBuy, image, dbResult.insertId);
                
                dispatch(updateProduct(updatedProductWithListItem));
                dispatch(addToShoppingList(newListItem));
            }
            
            else {
                const updatedProductWithoutListItem = {...updatedProduct, listItemId: null };

                await deleteListItemsFromDB([listItemId]);
                await updateProductInDB(id, name, label, convertToSqlDate(expiryDate), quantity, unit, !isToBuy, image, null);
                dispatch(updateProduct(updatedProductWithoutListItem));
                dispatch(deleteFromShoppingList(listItemId));
            }

            setIsToBuy(!isToBuy);
        } catch (err) {
            throw err;
        }
    };

    const editProduct = () => {
        props.navigation.navigate('Product', { id });
    };

    const formattedExpiryDate = convertDate(expiryDate);
    const headerTitle = name.length > 20 ? name.slice(0,20) + '...' : name;

    useEffect(() => {
        setIsToBuy(toBuy);
    }, [listItemId]);

    useEffect(() => {
        setImage(photo || defaultPhoto);
    }, [photo]);

    props.navigation.setOptions({
        headerTitle,
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
                <StyledText style={styles.quantity}>{quantity} {unit}</StyledText>
                {expiryDate 
                ? (
                    <StyledText style={styles.expiryDate}>
                        Use before <StyledText style={{fontFamily: 'lato-bold'}}>
                            {formattedExpiryDate}
                            </StyledText>
                    </StyledText>
                ) : null}
            </View>
            <Image
                source={{
                    uri: image,
                }}
                style={styles.image}
            />
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
        flex: 2,
        width: '80%',
        padding: 15,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5,
        width: '80%',
        // backgroundColor: 'green'

    },
    name: {
        color: colors.secondary
    },
    quantity: {
        color: colors.textLight
    },
    expiryDate: {

    },
    image: {
        left: 0,
        bottom: 0,
        width: '100%',
        flex: 10
    }
});

export default productDetails;
