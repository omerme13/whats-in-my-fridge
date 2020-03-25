import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';
import StyledText from '../StyledText';


const products = props => {

    const renderGridItem = itemData => {
        return (
            <GridItem item={itemData.item} navigation={props.navigation} />
        );
    };

    const productsArr = [
        { id: 1, name: 'banana' },
        { id: 2, name: 'cheese' }
    ];


    return(
        <FlatList 
            keyExtractor={item => item.id} 
            data={productsArr} 
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