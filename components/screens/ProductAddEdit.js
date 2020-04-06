import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Picker
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
            
        var { name, label, expiryDate, quantity, unit, photo } = details;
    }
        
    const [formUnit, setFormUnit] = useState(isUpdateState ? unit : 'pcs');
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
            label: true,
            quantity: isUpdateState ? true : false,
        },
        isFormValid: isUpdateState ? true : false
    });

    const dispatch = useDispatch();

    const saveChanges = useCallback(
        () => {
            setIsLoading(true);

            if (!formState.isFormValid) {
                Alert.alert('Wrong input', 'Please enter valid name and quantity.', [
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

    console.log(newProduct)
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
            formUnit,
            photo
        ));

    }, [formState, date, formUnit]);

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
        <ScrollView>
            <View style={styles.form}>
                <FormInput
                    label="name"
                    input={formState.inputValues.name}
                    set={(inputValue, isValid) =>
                        setTextHandler("name", inputValue, isValid)
                    }
                    maxLength={16}
                    required
                />
                <FormInput
                    label="label"
                    input={formState.inputValues.label}
                    set={(inputValue, isValid) =>
                        setTextHandler("label", inputValue, isValid)
                    }
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FormInput
                        label="quantity"
                        input={formState.inputValues.quantity}
                        keyboardType="number-pad"
                        set={(inputValue, isValid) =>
                            setTextHandler("quantity", inputValue, isValid)
                        }
                        required
                        min={0.1}
                        textAlign="center"
                    />
                    <Picker
                        selectedValue={formUnit}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setFormUnit(itemValue)}
                    >
                        <Picker.Item label="pcs" value="pcs" />
                        <Picker.Item label="Kg" value="Kg" />
                        <Picker.Item label="Lbs" value="Lbs" />
                    </Picker>
                </View>


                <StyledText type="title" style={{textAlign: 'left'}}>
                    Expiry Date
                </StyledText>
                <DatePicker expiryDate={date} set={set} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 25
    },
    picker: {
        height: 50,
        width: 150,
        marginTop: 30,
        marginLeft: 15,
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'red'
    }
});

export default productAddEdit;
