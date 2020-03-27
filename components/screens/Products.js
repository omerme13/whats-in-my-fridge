import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';
import { PRODUCTS } from '../../data/data';

const products = props => {

    const renderGridItem = itemData => {
        return (
            <GridItem item={itemData.item} navigation={props.navigation} />
        );
    };

    return(
        <FlatList 
            keyExtractor={item => item.id} 
            data={PRODUCTS} 
            renderItem={renderGridItem} 
            numColumns={2} 
        />
    );
}

products.navigationOptions = navData => {
    return {
        headerTitle: 'Products In Fridge',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="hamburger"
                    iconName="ios-menu"
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    }
}

export default products;