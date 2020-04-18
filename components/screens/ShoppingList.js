import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import EmptyScreenMsg from '../EmptyScreenMsg';
import ListItemRow from '../ListItemRow';
import MainButtons from '../MainButtons';
import Spinner from '../Spinner';
import { deleteFromShoppingList, loadShoppingList } from '../../store/actions/shoppingList';
import { updateProduct } from '../../store/actions/product';
import { deleteListItemsFromDB, updateProductInDB } from '../../utils/db';
import { convertToSqlDate } from '../../utils/convert';

const shoppingList = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIds] = useState([]);
    const dispatch = useDispatch();

    const list = useSelector(state => state.shoppingList.listItems);
    const products = useSelector(state => state.product.productsInFridge);
    const arrayList = Object.values(list);

    const renderListItemRow = itemData => (
        <ListItemRow 
            item={itemData.item}
            navigation={props.navigation}
            isDeleteState={isDeleteState}
            addToIds={addToIds}
        />
    );

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

    const deleteItems = async () => {
        try {
            await deleteListItemsFromDB(ids);
            
            for (const listItemId of ids) {
                dispatch(deleteFromShoppingList(listItemId));
            }
        } catch (err) {
            throw err;
        }

        toggleDeleteState();

        // removing 'toBuy' from the products we deleted from the list
        for (let product of products) {
            if (ids.includes(product.listItemId)) {
                product.toBuy = false;
                product.listItemId = null;
                dispatch(updateProduct(product));
                const { id, name, label, expiryDate, quantity, unit, photo } = product;
                await updateProductInDB(id, name, label, convertToSqlDate(expiryDate), quantity, unit, false, photo, null)
            }
        }
        
        setIds([]);
    };

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            await dispatch(loadShoppingList());
            setIsLoading(false);
        })()
    }, [dispatch]);

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
                keyExtractor={item => String(item.id)} 
                data={arrayList} 
                renderItem={renderListItemRow} 
            />
        ) : (
            <EmptyScreenMsg 
                message="Your list is empty, add new products."
                iconName="cart"
            />
        )

    if (isLoading) {
        return <Spinner />
    }

    return(
        <>
            {content}
            <MainButtons
                navigation={props.navigation}
                navigateTo="ListItem"
                isDeleteState={isDeleteState}
                toggleDeleteState={toggleDeleteState}
                deleteItems={deleteItems}
            />
        </>
    );
}

export default shoppingList;