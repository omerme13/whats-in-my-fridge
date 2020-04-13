import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import FormInput from '../FormInput';
import Spinner from '../Spinner';
import ListItem from '../../models/listItem';
import { addToShoppingList } from '../../store/actions/shoppingList';
import { insertListItemToDB, updateListItemInDB } from '../../utils/db';


const listItemAddEdit = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [newListItem, setNewListItem] = useState({});
    const id = props.route.params.id;
    const isUpdateState = id;
    
    if (isUpdateState) {
        const details = useSelector(state =>
            state.shoppingList.listItems[id]
        );
            
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
            
            const { name, label, isDone } = newListItem;

            if (isUpdateState) {
                dispatch(addToShoppingList(newListItem));
                await updateListItemInDB(id, name, label, isDone);
            } else {
                const dbResult = await insertListItemToDB(String(name), String(label));
                const listItem = { ...newListItem, id: dbResult.insertId };
                dispatch(addToShoppingList(listItem));
            }

            props.navigation.goBack(null);
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
                <FormInput
                    label="label"
                    input={listItemLabel}
                    set={inputValue => setListItemLabel(inputValue)}
                    maxLength={16}
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