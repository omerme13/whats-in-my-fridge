import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Searchbar from '../Searchbar';
import FridgeItem from '../FridgeItem';
import { shortenString } from '../../utils/convert';

const filteredFridge = props => {
    const [filterBy, setFilterBy] = useState('');

    const viewPref = useSelector(state => state.settings.viewPref);
    const products = useSelector(state => state.product.productsInFridge);
    let label;
    let filteredProducts;
    
    console.log({viewPref})
    if (!props.route.params && filterBy) {
        filteredProducts = products.filter(prod => (
            prod.name.toLowerCase().includes(filterBy.toLowerCase()) ||
            prod.label.toLowerCase().includes(filterBy.toLowerCase()) 
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
                minimal={viewPref === 'minimal'}
            />
        );
    };

    return (
        <FlatList
            key={viewPref === 'regular' ? '1' : '0'}
            keyExtractor={item => String(item.id)} 
            data={filteredProducts} 
            renderItem={renderFridgeItem} 
            numColumns={viewPref === 'regular' ? 2 : 1}
        />
    )
};

export default filteredFridge;