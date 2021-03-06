import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../UI/HeaderButton';
import FormInput from '../form/FormInput';
import Spinner from '../UI/Spinner';
import StyledText from '../UI/StyledText';
import DatePicker from '../form/DatePicker';
import ImagePicker from '../form/ImagePicker';
import AutocompleteFormInput from '../form/AutocompleteFormInput';
import Product from '../../models/product';
import { createProduct, updateProduct } from '../../store/actions/product';
import { formReducer } from '../../utils/validation';
import { insertProductToDB, updateProductInDB } from '../../utils/db';
import { convertToSqlDate } from '../../utils/convert';
import { colors } from '../../utils/variables';

const FORM_UPDATE = 'FORM_UPDATE';

const productAddEdit = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({});
    const id = props.route.params.id;
    const isUpdateState = id;
    
    const products = useSelector(state => state.product.productsInFridge);
    const areAmericanUnits = useSelector(state => state.settings.areAmericanUnits);
    if (isUpdateState) {
        const details = products.find(prod => prod.id === id);

        var { 
            name,
            label,
            expiryDate,
            quantity,
            unit,
            toBuy,
            photo,
            listItemId
         } = details;
    }
        
    const [image, setImage] = useState(isUpdateState ? photo : null);
    const [prevImage, setPrevImage] = useState(null);

    const saveImage = imagePickerImage => {
        setPrevImage(image);
        setImage(imagePickerImage);
    }

    const updateFileSystem = async pickedImage => {
        if (!pickedImage) {
            return;
        }

        const fileName = pickedImage.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        
        try {
            if (prevImage) {
                await FileSystem.deleteAsync(prevImage);
            }

            await FileSystem.moveAsync({
                from: pickedImage,
                to: newPath
            });

            setImage(newPath);
            return newPath;

        } catch (err) {
            throw err;
        }
    }

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            name: isUpdateState ? name : '',
            label: isUpdateState ? label : '',
            quantity: isUpdateState ? quantity : '',
            unit: isUpdateState ? unit : 'PCS',
            expiryDate: isUpdateState ? expiryDate : null
        },
        inputValidities: {
            name: isUpdateState ? true : false,
            label: true,
            quantity: isUpdateState ? true : false,
            unit: true,
            expiryDate: true
        },
        isFormValid: isUpdateState ? true : false
    });

    const dispatch = useDispatch();

    const saveChanges = useCallback(
        async () => {
            setIsLoading(true);

            if (!formState.isFormValid) {
                Alert.alert('Wrong input', 'Please enter valid name and quantity.', [
                    { text: 'Okay' }
                ]);
                setIsLoading(false);

                return;
            }

            try {
                const { id, name, label, expiryDate, quantity, unit, toBuy, photo, listItemId } = newProduct;
                
                if (isUpdateState) {
                    const newPath = await updateFileSystem(photo);
                    await updateProductInDB(id, name, label, convertToSqlDate(expiryDate), quantity, unit, toBuy, newPath || photo, listItemId);
                    dispatch(updateProduct({ ...newProduct, photo: newPath }));
                } else {
                    const newPath = await updateFileSystem(photo);
                    const dbResult = await insertProductToDB(name, label, convertToSqlDate(expiryDate), quantity, unit, toBuy, newPath || photo);
                    const product = { ...newProduct, photo: newPath, id: dbResult.insertId };
                    dispatch(createProduct(product));
                }
            } catch (err) {
                console.log(err);
                throw err;
            }

            props.navigation.goBack(null);
            setIsLoading(false);
        },
        [formState, newProduct, image]
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
        const { name, label, quantity, unit, expiryDate } = formState.inputValues;
        setNewProduct(new Product(
            isUpdateState ? id : new Date().toString(),
            name,
            label,
            expiryDate,
            quantity,
            unit,
            toBuy,
            image,
            listItemId
        ));

    }, [formState, image]);

    if (isLoading) {
        return <Spinner />;
    }

    props.navigation.setOptions({
        headerTitle: id ? "Edit Product" : "Add Product",
        headerRight: navigation => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="save"
                    iconName="done"
                    onPress={() => saveChanges(newProduct)}
                />
            </HeaderButtons>
        )
    });

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.form}>
                <AutocompleteFormInput 
                    data={products.map(prod => prod.label)}
                    label="label"
                    input={formState.inputValues.label}
                    set={value => setTextHandler('label', value, true)}
                    maxLength={32}
                />
                <FormInput
                    label="name"
                    input={formState.inputValues.name}
                    set={(inputValue, isValid) =>
                        setTextHandler("name", inputValue, isValid)
                    }
                    maxLength={32}
                    required
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
                        maxLength={8}
                        textAlign="center"
                        placeholder="0"
                        unit={unit}
                    />
                    <Picker
                        selectedValue={formState.inputValues.unit}
                        style={styles.picker}
                        onValueChange={value => setTextHandler('unit', value, true)}
                    >
                        <Picker.Item label="PCS" value="PCS" />
                        <Picker.Item label="Packages" value="Packages" />
                        <Picker.Item
                            label={areAmericanUnits ? 'LBS' : 'KG'}
                            value={areAmericanUnits ? 'LBS' : 'KG'} 
                        />
                        <Picker.Item
                            label={areAmericanUnits ? 'OZ' : 'Litre'}
                            value={areAmericanUnits ? 'OZ' : 'Litre'}
                        />
                    </Picker>
                </View>
                <StyledText type="title" style={{textAlign: 'left', marginTop: 15, color: colors.primaryDarker }}>
                    Expiry Date
                </StyledText>
                <DatePicker
                    expiryDate={formState.inputValues.expiryDate}
                    set={value => setTextHandler('expiryDate', value, true)} 
                />
                <StyledText type="title" style={{textAlign: 'left', marginTop: 15, color: colors.primaryDarker }}>
                    Image
                </StyledText>
                <ImagePicker image={image} setImage={saveImage} />
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
