import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import EmptyScreenMsg from '../EmptyScreenMsg';
import ListItemRow from '../ListItemRow';
import MainButtons from '../MainButtons';
import Spinner from '../Spinner';
import SideModal from '../SideModal';
import SortOptions from '../SortOptions';
import { deleteFromShoppingList, loadShoppingList } from '../../store/actions/shoppingList';
import { addPreference } from '../../store/actions/settings';
import { updateProduct } from '../../store/actions/product';
import { deleteListItemsFromDB, updateProductInDB } from '../../utils/db';
import { convertToSqlDate } from '../../utils/convert';
import { sortObjects } from '../../utils/sort';

const shoppingList = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch(); 

    const products = useSelector(state => state.product.productsInFridge);
    const sortPref = useSelector(state => state.settings.sortPref);
    const list = useSelector(state => state.shoppingList.listItems);
    const [sortBy, setSortBy] = useState(sortPref ? sortPref.sortBy : '');
    const [direction, setDirection] = useState(sortPref ? sortPref.direction : 1);

    if (list.length) {
        sortObjects(list, sortBy, direction);
    }

    const setSortOption = option => {
        if (option === sortBy) {
            setDirection(direction * -1);
            addPreference({
                sortBy: option,
                direction: direction * -1
            });
        } else {
            setSortBy(option);
            addPreference({
                sortBy: option,
                direction
            });
        }
    };

    const renderListItemRow = itemData => (
        <ListItemRow 
            item={itemData.item}
            navigation={props.navigation}
            isDeleteState={isDeleteState}
            addToIds={addToIds}
            toggleDeleteState={toggleDeleteState}
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
    const toggleModal = () => setIsModalOpen(!isModalOpen);

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

    useEffect(() => {
        if (list.length) {
            sortObjects(list, sortBy, direction);
            toggleModal();
        }

    }, [sortBy, direction]);

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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="sort"    
                    iconName="sort"
                    onPress={toggleModal}
                />
            </HeaderButtons>
        )
    });

    let content = list.length
        ? (
            <View style={{flex: 1, justifyContent: 'space-around'}}>
                <FlatList 
                    keyExtractor={item => String(item.id)} 
                    data={list.filter(item => !item.isDone)} 
                    renderItem={renderListItemRow} 
                />
                <FlatList 
                    keyExtractor={item => String(item.id)} 
                    data={list.filter(item => item.isDone)} 
                    renderItem={renderListItemRow} 
                />
            </View>
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
            <SideModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen} 
            >
                <SortOptions 
                    values={['name', 'label']}
                    setSort={setSortOption}
                />
            </SideModal>
        </>
    );
}

export default shoppingList;
