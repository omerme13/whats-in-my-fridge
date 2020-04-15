import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import GridItem from '../GridItem';
import EmptyScreenMsg from '../EmptyScreenMsg';
import HeaderButton from '../HeaderButton';
import MainButtons from '../MainButtons';
import Spinner from '../Spinner';
import { deleteProduct } from '../../store/actions/product';
import { loadProducts } from '../../store/actions/product';
import { deleteProductFromDB } from '../../utils/db';

const products = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIds] = useState();
    const dispatch = useDispatch();

    const products = useSelector(state => state.product.productsInFridge);

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

    const removeFromIds = async () => {
        try {
            await deleteProductFromDB(ids);
    
            for (const productId of ids) {
                dispatch(deleteProduct(productId));
            }
        } catch (err) {
            throw err;
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
        setIsLoading(true);

        (async () => {
            await dispatch(loadProducts());
            setIsLoading(false);
        })()
    }, [dispatch, products.length]);

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

    if (isLoading) {
        return <Spinner />
    }
    
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