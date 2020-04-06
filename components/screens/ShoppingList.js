import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import EmptyScreenMsg from '../EmptyScreenMsg';
import ListItemRow from '../ListItemRow';
import MainButtons from '../MainButtons';

const shoppingList = props => {
    const [isDeleteState, setIsDeleteState] = useState(false)
    const list = useSelector(state => state.shoppingList.listItems);
    const arrayList = Object.values(list);

    const addToIds = () => {};

    const renderListItemRow = itemData => (
        <ListItemRow 
            item={itemData.item}
            navigation={props.navigation}
            isDeleteState={isDeleteState}
            addToIds={addToIds}
        />
    );

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

    let content = arrayList.length
        ? (
            <FlatList 
                keyExtractor={item => item.id} 
                data={arrayList} 
                renderItem={renderListItemRow} 
            />
        ) : (
            <EmptyScreenMsg 
                message="Your list is empty, add new products."
                iconName="cart"
            />
        )

    return(
        <>
            {content}
            <MainButtons
                navigation={props.navigation}
                navigateTo="ListItem"
            />
        </>
    );
}

export default shoppingList;