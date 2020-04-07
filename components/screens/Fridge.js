import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from '../GridItem';
import EmptyScreenMsg from '../EmptyScreenMsg';
import HeaderButton from '../HeaderButton';
import { deleteProduct } from '../../store/actions/product';
import MainButtons from '../MainButtons';

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
            <MainButtons
                navigation={props.navigation}
                navigateTo="Product"
                isDeleteState={isDeleteState}
                toggleDeleteState={toggleDeleteState}
                removeFromIds={removeFromIds}
            />
        </View>
    );
};


export default products;