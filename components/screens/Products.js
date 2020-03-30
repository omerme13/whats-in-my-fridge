import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';

const products = props => {
    const renderGridItem = itemData => {
        return (
            <GridItem item={itemData.item} navigation={props.navigation} />
        );
    };

    const products = useSelector(state => state.product.productsInFridge);

    props.navigation.setOptions({
        headerTitle: 'Products In Fridge',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="To Buy"    
                    iconName="shopping-cart"
                    onPress={() => props.navigation.navigate('ShoppingList')}  
                />
            </HeaderButtons>
        ),
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

    return(
        <FlatList 
            keyExtractor={item => item.id} 
            data={products} 
            renderItem={renderGridItem} 
            numColumns={2} 
        />
    );
}

export default products;