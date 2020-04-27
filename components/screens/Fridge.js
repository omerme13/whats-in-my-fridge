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
import { addPreference } from '../../store/actions/settings';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const isOneColumn = useSelector(state => state.settings.isOneColumn);
    const products = useSelector(state => state.product.productsInFridge);
    const sortPref = useSelector(state => state.settings.sortFridgePref);

    const [sortBy, setSortBy] = useState(sortPref ? sortPref.sortBy : '');
    const [direction, setDirection] = useState(sortPref ? sortPref.direction : 1);

    if (products.length) {
        sortObjects(products, sortBy, direction);
    }

    const setSortOption = option => {
        if (option === sortBy) {
            setDirection(direction * -1);
            addPreference('sortFridgePref', {
                sortBy: option,
                direction: direction * -1
            });
        } else {
            setSortBy(option);
            addPreference('sortFridgePref', {
                sortBy: option,
                direction
            });
        }
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleDeleteState = () => setIsDeleteState(!isDeleteState);
    const toggleEditState = () => setIsEditState(!isEditState);

    const addDeletionData = data => {
        if (!data.photo) {
            data.photo = 'image'
        }

        const deleteDataObj = {...deleteData};

        if (deleteData[data.id]) {
            delete deleteDataObj[data.id];
        } else {
            deleteDataObj[data.id] = data.photo;
        }
        setDeleteData(deleteDataObj);
    };

    const addQuantityData = data => {
        const quantitiesObj = {...quantities};

        quantitiesObj[data.id] = data.tempQuantity;
        setQuantities(quantitiesObj);
    }

    const deleteItems = async () => {
        try {
            await deleteProductFromDB(Object.keys(deleteData));
    
            for (let id in deleteData) {
                dispatch(deleteProduct(id));

                if (deleteData[id] === 'image') {
                    continue;
                }
                await FileSystem.deleteAsync(deleteData[id]);
            }

            await dispatch(loadProducts());
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
                toggleDeleteState={toggleDeleteState}
            />
        );
    };

    const content = products.length
        ? (
            <FlatList
                key={isOneColumn ? '1' : '0'}
                keyExtractor={item => String(item.id)} 
                data={products} 
                renderItem={renderGridItem} 
                numColumns={isOneColumn ? 1 : 2}
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
    }, [dispatch]);

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
        if (products.length) {
            sortObjects(products, sortBy, direction);
            toggleModal();
        }

    }, [sortBy, direction]);

 

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
                    values={['name', 'label', 'quantity' ,'expiry Date', 'id']}
                    setSort={setSortOption}
                />
            </SideModal>
        </View>
    );
};

export default fridge;