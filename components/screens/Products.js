import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from "@expo/vector-icons";

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';
import { colors } from '../../utils/variables';

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
        <View style={{ position: 'relative', flex: 1 }}>
            <FlatList 
                keyExtractor={item => item.id} 
                data={products} 
                renderItem={renderGridItem} 
                numColumns={2} 
            />
            <View style={styles.addButton}>
                <MaterialIcons
                    name="add"
                    size={40}
                    color={colors.secondary}
                    onPress={() => props.navigation.navigate('Product', {id: null})}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        position: 'absolute',
        bottom: '5%',
        right: '5%',

    }
});

export default products;