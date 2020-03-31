import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../HeaderButton';
import FormInput from '../FormInput';
import Spinner from '../Spinner';
import Product from '../../models/product';
import { createProduct, updateProduct } from '../../store/actions/product';
import { formReducer } from '../../utils/validation';
import { colors } from '../../utils/variables';

const FORM_UPDATE = 'FORM_UPDATE';

const productAddEdit = props => {
    const [isLoading, setIsLoading] = useState(false);
    const id = props.route.params.id;
    let newProduct;
    const isUpdateState = id;

    if (isUpdateState) {
        const details = useSelector(state =>
            state.product.productsInFridge.find(prod => prod.id === id)
        );

        var { name, label, expiryDate, quantity, toBuy, photo } = details;
    }

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            name: isUpdateState ? name : '',
            label: isUpdateState ? label : '',
            expiryDate: isUpdateState ? expiryDate : '',
            quantity: isUpdateState ? quantity : '',
            toBuy: isUpdateState ? toBuy : '',
            photo: isUpdateState ? photo : ''
        },
        inputValidities: {
            name: isUpdateState ? true : false,
            label: isUpdateState ? true : false,
            expiryDate: isUpdateState ? true : false,
            quantity: isUpdateState ? true : false,
            toBuy: isUpdateState ? true : false,
            photo: isUpdateState ? true : false,
        },
        isFormValid: isUpdateState ? true : false
    });

    const dispatch = useDispatch();

    const saveChanges = useCallback(
        () => {
            setIsLoading(true);

            if (!formState.isFormValid) {
                Alert.alert('Wrong input', 'Please check the form again', [
                    { text: 'Okay' }
                ]);

                return;
            }

            if (isUpdateState) {
                dispatch(updateProduct(newProduct));
            } else {
                dispatch(createProduct(newProduct));
            }

            props.navigation.goBack();
            setIsLoading(false);
        },
        [formState]
    );

    const setTextHandler = (inputType, inputValue, isValid) => {
        formDispatch({
            type: FORM_UPDATE,
            inputValue,
            isValid,
            inputType
        });
    };

    useEffect(() => {
        const { name, label, expiryDate, quantity, toBuy, photo } = formState.inputValues;

        newProduct = new Product(
            isUpdateState ? id : new Date().toString(),
            name,
            label,
            expiryDate,
            quantity,
            toBuy,
            photo
        );

    }, [formState]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{text: 'OK'}])
        }
    }, [error]);

    if (isLoading) {
        return <Spinner />;
    }

    props.navigation.setOptions({
        headerTitle: id ? "Edit Product" : "Add Product",
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="save"
                    onPress={() => saveChanges(newProduct)}
                />
            </HeaderButtons>
        )
    });

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={styles.form}>
                    <FormInput
                        label="name"
                        input={formState.inputValues.name}
                        set={(inputValue, isValid) =>
                            setTextHandler("name", inputValue, isValid)
                        }
                        required
                    />
                    <FormInput
                        label="label"
                        input={formState.inputValues.label}
                        set={(inputValue, isValid) =>
                            setTextHandler("label", inputValue, isValid)
                        }
                    />
                    <FormInput
                        label="quantity"
                        input={formState.inputValues.quantity}
                        keyboardType="number-pad"
                        set={(inputValue, isValid) =>
                            setTextHandler("quantity", inputValue, isValid)
                        }
                        required
                        min={0.1}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    }
});

export default productAddEdit;
