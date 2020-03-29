import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';

const products = props => {
    const renderGridItem = itemData => {
        return (
            <GridItem item={itemData.item} navigation={props.navigation} />
        );
    };
    
    const products = useSelector(state => state.product.productsInFridge);
    const toggleDrawer = () => {};

    props.navigation.setOptions({
        headerTitle: 'Products In Fridge',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="menu"    
                    iconName="menu"
                    onPress={() => props.navigation.toggleDrawer()}
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