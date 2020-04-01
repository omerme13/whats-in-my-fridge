import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from '../GridItem';
import HeaderButton from '../HeaderButton';
import RoundButton from '../RoundButton';

const products = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [names, setNames] = useState([]);

    console.log(names)

    const addToNames = name => {
        if (names.includes(name)) {
            const namesArr = [...names];
            const nameIndex = namesArr.indexOf(name);

            namesArr.splice(nameIndex, 1);
            setNames(namesArr);
        } else {
            setNames(names.concat(name));
        }
    }

    const renderGridItem = itemData => {
        return (
            <GridItem 
                item={itemData.item} 
                navigation={props.navigation}
                isDeleteState={isDeleteState}
                addToNames={addToNames}
            />
        );
    };

    const products = useSelector(state => state.product.productsInFridge);

    useEffect(() => {
        if (!isDeleteState) {
            setNames([]);
        }
    }, [isDeleteState]);

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
            <View style={styles.buttonsContainer}>
                <RoundButton 
                    show={!isDeleteState} 
                    name="add" 
                    onPress={() => props.navigation.navigate('Product', {id: null})} 
                />
                <View style={styles.editContainer}>
                    <RoundButton 
                        show={!isDeleteState} 
                        name="edit" 
                        onPress={() => setIsDeleteState(!isDeleteState)} 
                    />
                    <RoundButton 
                        show={isDeleteState} 
                        name="delete" 
                        onPress={() => {}} 
                    />
                    <RoundButton 
                        show={isDeleteState} 
                        name="settings-backup-restore"
                        onPress={() => setIsDeleteState(!isDeleteState)}
                        style={{ marginLeft: 15 }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
    },
    editContainer: {
        flexDirection: 'row'
    }
});

export default products;