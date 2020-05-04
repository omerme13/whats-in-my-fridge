import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Searchbar from '../Searchbar';
import FridgeItem from '../FridgeItem';
import { shortenString } from '../../utils/convert';

const filteredFridge = props => {
    const [filterBy, setFilterBy] = useState('');

    const products = useSelector(state => state.product.productsInFridge);
    let label;
    let filteredProducts;
    
    if (!props.route.params && filterBy) {
        filteredProducts = products.filter(prod => (
            prod.name.toLowerCase().includes(filterBy.toLowerCase()) 
        ));
    } else if (props.route.params) {
        label = props.route.params.label;
        filteredProducts = products.filter(prod => (
            prod.label.toLowerCase() === label.toLowerCase()
        ));
    
        label = shortenString(label, 16);
    }

    props.navigation.setOptions({
        headerTitle: label ? label : '',
        headerRight: label ? '' : () => <Searchbar set={setFilterBy} />,
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