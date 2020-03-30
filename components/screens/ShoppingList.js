import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import HeaderButton from '../HeaderButton';

import ListItem from '../ListItem'; 

const shoppingList = props => {
    const list = useSelector(state => state.shoppingList.listItems);
    const arrayList = Object.values(list);

    props.navigation.setOptions({
        headerTitle: 'Shopping List',
    });

    return(
        <FlatList 
            keyExtractor={item => item.id} 
            data={arrayList} 
            renderItem={itemData => <ListItem item={itemData.item} />} 
        />
    );
}

export default shoppingList;