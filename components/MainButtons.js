import React from 'react';
import { View, StyleSheet } from 'react-native';

import RoundButton from './RoundButton';

const mainButtons = props => {
    return (
        <View style={styles.mainButtons}>
            <RoundButton 
                show={!props.isDeleteState} 
                name="add" 
                onPress={() => props.navigation.navigate(props.navigateTo, {id: null})} 
            />
            <View style={styles.editContainer}>
                <RoundButton 
                    show={!props.isDeleteState} 
                    name="edit" 
                    onPress={props.toggleDeleteState} 
                />
                <RoundButton 
                    show={props.isDeleteState} 
                    name="delete" 
                    onPress={props.removeFromIds} 
                />
                <RoundButton 
                    show={props.isDeleteState} 
                    name="arrow-back"
                    onPress={props.toggleDeleteState}
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