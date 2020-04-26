import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import FormInput from '../FormInput';
import AutocompleteFormInput from '../AutocompleteFormInput';
import Spinner from '../Spinner';
import ListItem from '../../models/listItem';
import { addToShoppingList, updateListItem } from '../../store/actions/shoppingList';
import { insertListItemToDB, updateListItemInDB } from '../../utils/db';


const listItemAddEdit = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [newListItem, setNewListItem] = useState({});
    const id = props.route.params.id;
    const isUpdateState = id;
    
    const list = useSelector(state => state.shoppingList.listItems);

    if (isUpdateState) {
        const details = list.find(item => item.id === id);
        var { name, label, isDone } = details;
    }

    const [listItemName, setListItemName] = useState(isUpdateState ? name : '');
    const [listItemLabel, setListItemLabel] = useState(isUpdateState ? label : '');
    const [isNameValid, setIsNameValid] = useState(isUpdateState ? true : false);
    const [isFormValid, setIsFormValid] = useState(isUpdateState ? true : false);

    const dispatch = useDispatch();

    const saveChanges = useCallback(
        async () => {
            setIsLoading(true);
            
            if (!isFormValid) {
                Alert.alert('Wrong input', 'Please check the form again', [
                    { text: 'Okay' }
                ]);
                setIsLoading(false);

                return;
            }
            
            try {
                const { name, label, isDone } = newListItem;
    
                if (isUpdateState) {
                    dispatch(updateListItem(newListItem));
                    await updateListItemInDB(id, name, label, isDone);
                } else {
                    const dbResult = await insertListItemToDB(String(name), String(label));
                    const listItem = { ...newListItem, id: dbResult.insertId };
                    dispatch(addToShoppingList(listItem));
                }
    
                props.navigation.goBack(null);
            } catch (err) {
                throw err;
            }
        },
        [newListItem, isNameValid]
    );

    useEffect(() => {
        setIsFormValid(isNameValid);

        setNewListItem(new ListItem(
            isUpdateState ? id : new Date().toString(),
            listItemName,
            listItemLabel,
            isDone
        ));

    }, [listItemName, listItemLabel, isNameValid]);

    if (isLoading) {
        return <Spinner />;
    }

    props.navigation.setOptions({
        headerTitle: id ? "Edit List Item" : "Add List Item",
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="save"
                    onPress={() => saveChanges(newListItem)}
                />
            </HeaderButtons>
        )
    });

    return (
        <ScrollView>
            <View style={styles.form}>
                <AutocompleteFormInput
                    label="label"
                    input={listItemLabel}
                    set={inputValue => setListItemLabel(inputValue)}
                    maxLength={32}
                    data={list.map(item => item.label)}
                />
                <FormInput
                    label="name"
                    input={listItemName}
                    set={(inputValue, isValid) => {
                        setListItemName(inputValue);
                        setIsNameValid(isValid);
                    }}
                    maxLength={32}
                    required
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    }
});

export default listItemAddEdit;
