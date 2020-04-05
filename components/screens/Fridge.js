import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from '../GridItem';
import EmptyScreenMsg from '../EmptyScreenMsg';
import HeaderButton from '../HeaderButton';
import RoundButton from '../RoundButton';
import { deleteProduct } from '../../store/actions/product';

const products = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [ids, setIds] = useState();
    const dispatch = useDispatch();

    const addToIds = id => {
        if (ids.includes(id)) {
            const idsArr = [...ids];
            const idIndex = idsArr.indexOf(id);

            idsArr.splice(idIndex, 1);
            setIds(idsArr);
        } else {
            setIds(ids.concat(id));
        }
    };

    const toggleDeleteState = () => setIsDeleteState(!isDeleteState);

    const removeFromIds = () => {
        for (const productId of ids) {
            dispatch(deleteProduct(productId));
        }

        toggleDeleteState();
        setIds([]);
    };

    const renderGridItem = itemData => {
        return (
            <GridItem 
                item={itemData.item} 
                navigation={props.navigation}
                isDeleteState={isDeleteState}
                addToIds={addToIds}
            />
        );
    };

    const products = useSelector(state => state.product.productsInFridge);

    const content = products.length
        ? (
            <FlatList 
                keyExtractor={item => item.id} 
                data={products} 
                renderItem={renderGridItem} 
                numColumns={2} 
            />
        ) : (
            <EmptyScreenMsg 
                message="Your fridge is empty, add new products."
                iconName="fridge"
            />
        )

    useEffect(() => {
        if (!isDeleteState) {
            setIds([]);
        }
    }, [isDeleteState]);

    props.navigation.setOptions({
        headerTitle: 'Products In Fridge',
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
            {content}
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
                        onPress={toggleDeleteState} 
                    />
                    <RoundButton 
                        show={isDeleteState} 
                        name="delete" 
                        onPress={removeFromIds} 
                    />
                    <RoundButton 
                        show={isDeleteState} 
                        name="arrow-back"
                        onPress={toggleDeleteState}
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
        flexDirection: 'row'
    },
    editContainer: {
        flexDirection: 'row'
    }
});

export default products;