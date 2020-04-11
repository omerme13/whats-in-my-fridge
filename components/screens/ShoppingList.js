import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import HeaderButton from '../HeaderButton';
import EmptyScreenMsg from '../EmptyScreenMsg';
import ListItemRow from '../ListItemRow';
import MainButtons from '../MainButtons';
import Spinner from '../Spinner';
import { deleteFromShoppingList } from '../../store/actions/shoppingList';
import { updateProduct } from '../../store/actions/product';
import { loadShoppingList } from '../../store/actions/shoppingList';

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

    const removeFromIds = () => {
        for (const listItemId of ids) {
            dispatch(deleteFromShoppingList(listItemId));
        }

        toggleDeleteState();

        // removing 'toBuy' from the products we deleted from the list
        for (let product of products) {
            if (ids.includes(product.name)) {
                product.toBuy = false;
                dispatch(updateProduct(product));
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
    console.log(isLoading)

    return(
        <>
            {content}
            <MainButtons
                navigation={props.navigation}
                navigateTo="ListItem"
                isDeleteState={isDeleteState}
                toggleDeleteState={toggleDeleteState}
                removeFromIds={removeFromIds}
            />
        </>
    );
}

export default shoppingList;