import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';

import GridItem from '../GridItem';
import EmptyScreenMsg from '../EmptyScreenMsg';
import HeaderButton from '../HeaderButton';
import MainButtons from '../MainButtons';
import Spinner from '../Spinner';
import SideModal from '../SideModal';
import SortOptions from '../SortOptions';

import { deleteProduct, updateProduct, loadProducts } from '../../store/actions/product';
import { deleteProductFromDB, updateProductInDB } from '../../utils/db';
import { convertToSqlDate } from '../../utils/convert';
import { sortObjects } from '../../utils/sort';

const fridge = props => {
    const [isDeleteState, setIsDeleteState] = useState(false);
    const [isEditState, setIsEditState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [quantities, setQuantities] = useState({});
    const [sortBy, setSortBy] = useState(null);
    const [direction, setDirection] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.productsInFridge);

    const setSortOption = option => {
        option === sortBy
            ? setDirection(direction * -1)
            : setSortBy(option);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const addDeletionData = data => {
        if (deleteData[data.id]) {
            delete deleteData[data.id];
        } else {
            const deleteDataObj = {...deleteData};
            deleteDataObj[data.id] = data.photo;

            setDeleteData(deleteDataObj);
        }
    };

    const addQuantityData = data => {
        const quantitiesObj = {...quantities};

        quantitiesObj[data.id] = data.tempQuantity;
        setQuantities(quantitiesObj);
    }

    const toggleDeleteState = () => setIsDeleteState(!isDeleteState);
    const toggleEditState = () => setIsEditState(!isEditState);

    const deleteItems = async () => {
        try {
            await deleteProductFromDB(Object.keys(deleteData));
    
            for (let id in deleteData) {
                dispatch(deleteProduct(id));

                if (deleteData[id] === null) {
                    continue;
                }
                await FileSystem.deleteAsync(deleteData[id]);
            }
        } catch (err) {
            throw err;
        }

        toggleDeleteState();
    };

    const updateQuantities = async () => {
        try {
            for (let id in quantities) {
                const updatedProduct = products.find(prod => prod.id == id);
                const { name, label, expiryDate, unit, toBuy, photo, listItemId } = updatedProduct;
                await updateProductInDB(id, name, label, convertToSqlDate(expiryDate), quantities[id], unit, toBuy, photo, listItemId);
                dispatch(updateProduct({...updatedProduct, quantity: quantities[id]}))
            }
        } catch (err) {
            throw err;
        }

        toggleEditState();
    };

    const renderGridItem = itemData => {
        return (
            <GridItem 
                item={itemData.item} 
                navigation={props.navigation}
                isDeleteState={isDeleteState}
                isEditState={isEditState}
                addDeletionData={addDeletionData}
                addQuantityData={addQuantityData}
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
            setDeleteData({});
        }
    }, [isDeleteState]);

    useEffect(() => {
        if (!isEditState) {
            setQuantities({});
        }
    }, [isEditState]);

    useEffect(() => {
        sortObjects(products, sortBy, direction);
        if (sortBy) {
            toggleModal();
        }

    }, [sortBy, direction])

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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="sort"    
                    iconName="sort"
                    onPress={toggleModal}
                />
            </HeaderButtons>
        ),
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
                isEditState={isEditState}
                toggleEditState={toggleEditState}
                deleteItems={deleteItems}
                updateQuantities={updateQuantities}
                isFridge
            />
            <SideModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen} 
            >
                <SortOptions 
                    values={['name', 'label', 'quantity' ,'expiry Date']}
                    setSort={setSortOption}
                />
            </SideModal>
        </View>
    );
};

export default fridge;