import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import EmptyScreenMsg from '../EmptyScreenMsg';
import ListItem from '../ListItem'; 

const shoppingList = props => {
    const list = useSelector(state => state.shoppingList.listItems);
    const arrayList = Object.values(list);



    props.navigation.setOptions({
        headerTitle: 'Shopping List',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="menu"    
                    iconName="menu"
                    onPress={() => {}}
                />
            </HeaderButtons>
        )
    });

    if (!arrayList.length) {
        return (
            <EmptyScreenMsg 
                message="Your list is empty, add new products."
                iconName="cart"
            />
        )
    }

    return(
        <FlatList 
            keyExtractor={item => item.id} 
            data={arrayList} 
            renderItem={itemData => <ListItem item={itemData.item} />} 
        />
    );
}

export default shoppingList;