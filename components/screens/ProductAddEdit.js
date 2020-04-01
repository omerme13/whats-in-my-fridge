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
import StyledText from '../StyledText';
import DatePicker from '../DatePicker';
import Product from '../../models/product';
import { createProduct, updateProduct } from '../../store/actions/product';
import { formReducer } from '../../utils/validation';
import { colors } from '../../utils/variables';

const FORM_UPDATE = 'FORM_UPDATE';

const productAddEdit = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({});
    const id = props.route.params.id;
    const isUpdateState = id;
    
    if (isUpdateState) {
        const details = useSelector(state =>
            state.product.productsInFridge.find(prod => prod.id === id)
        );
            
        var { name, label, expiryDate, quantity, photo } = details;
    }
        
    const [date, setDate] = useState(isUpdateState ? expiryDate : null);
    const set = datePickerDate => {
        setDate(datePickerDate);
    }

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            name: isUpdateState ? name : '',
            label: isUpdateState ? label : '',
            quantity: isUpdateState ? quantity : '',
            photo: isUpdateState ? photo : ''
        },
        inputValidities: {
            name: isUpdateState ? true : false,
            label: isUpdateState ? true : false,
            quantity: isUpdateState ? true : false,
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
                setIsLoading(false);

                return;
            }

            if (isUpdateState) {
                dispatch(updateProduct(newProduct));
            } else {
                dispatch(createProduct(newProduct));
            }

            props.navigation.goBack(null);
        },
        [formState, newProduct]
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
        const { name, label, quantity, photo } = formState.inputValues;
        setNewProduct(new Product(
            isUpdateState ? id : new Date().toString(),
            name,
            label,
            date,
            quantity,
            photo
        ));

    }, [formState, date]);

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
                    <StyledText type="title" style={{textAlign: 'left'}}>
                        Expiry Date
                    </StyledText>
                    <DatePicker expiryDate={date} set={set} />
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
