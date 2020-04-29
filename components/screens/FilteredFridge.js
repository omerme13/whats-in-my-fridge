import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import FridgeItem from '../FridgeItem';
import { shortenString } from '../../utils/convert';

const filteredFridge = props => {
    let label = props.route.params.label;
    const products = useSelector(state => state.product.productsInFridge);
    const filteredProducts = products.filter(prod => (
        prod.label.toLowerCase() === label.toLowerCase()
    ));

    label = shortenString(label, 12);

    props.navigation.setOptions({
        headerTitle: label + ' Products'
    });

    const renderFridgeItem = itemData => {
        return (
            <FridgeItem 
                item={itemData.item} 
                navigation={props.navigation}
                filtered
            />
        );
    };

    return (
        <FlatList 
            keyExtractor={item => item.id} 
            data={filteredProducts} 
            renderItem={renderFridgeItem} 
            numColumns={2} 
        />
    )
};

export default filteredFridge;