import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ListItemRow from '../ListItemRow';

const filteredShoppingList = props => {
    let label = props.route.params.label;
    const list = useSelector(state => state.shoppingList.listItems);
    const arrayList = Object.values(list);

    const filteredList = arrayList.filter(listItem => (
        listItem.label.toLowerCase() === label.toLowerCase()
    ));

    const renderListItemRow = itemData => (
        <ListItemRow 
            item={itemData.item}
            navigation={props.navigation}
            filtered
        />
    );

    props.navigation.setOptions({
        headerTitle: label
    });

    return(
        <FlatList 
            keyExtractor={item => String(item.id)} 
            data={filteredList} 
            renderItem={renderListItemRow} 
        />
    );
}

export default filteredShoppingList;