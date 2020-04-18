import React from 'react';
import { View, StyleSheet } from 'react-native';

import RoundButton from './RoundButton';

const mainButtons = props => {
    return (
        <View style={styles.mainButtons}>
            <RoundButton 
                show={!props.isDeleteState && !props.isEditState} 
                name="add" 
                onPress={() => props.navigation.navigate(props.navigateTo, {id: null})} 
            />
            <View style={styles.editContainer}>
                <RoundButton 
                    show={!props.isEditState && !props.isDeleteState && props.isFridge} 
                    name="edit" 
                    onPress={props.toggleEditState} 
                />
                <RoundButton 
                    show={!props.isDeleteState && !props.isEditState} 
                    name="delete" 
                    onPress={props.toggleDeleteState}
                />
                <RoundButton 
                    show={props.isDeleteState || props.isEditState} 
                    name="save"
                    onPress={props.isDeleteState ? props.deleteItems : props.updateQuantities}
                />
                <RoundButton 
                    show={props.isDeleteState || props.isEditState} 
                    name="arrow-back"
                    onPress={props.isDeleteState ? props.toggleDeleteState : props.toggleEditState}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainButtons: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        flexDirection: 'row'
    },
    editContainer: {
        flexDirection: 'row'
    }
});

export default mainButtons;