import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

import RoundButton from './RoundButton';

const mainButtons = props => {
    const [areButtonsVisible, setAreButtonsVisible] = useState(true);
    
    const toggleMainButtons = () => setAreButtonsVisible(!areButtonsVisible);

    const { isDeleteState } = props;
    useEffect(() => {
        if (isDeleteState && !areButtonsVisible) {
            toggleMainButtons();
        } 
    }, [isDeleteState]);

    return (
        <View style={{...styles.mainButtons, ...props.style}}>
            {props.isFridge &&
               <MaterialCommunityIcons
                    name="dots-vertical"
                    size={40}
                    onPress={toggleMainButtons}
                    style={styles.toggleButton}
                />
            }
            <Animatable.View 
                style={{ flexDirection: 'row' }}
                animation={areButtonsVisible ? 'fadeInRight' : 'fadeOutRight'}
                duration={200}
            >
                <RoundButton 
                    show={!props.isDeleteState && !props.isEditState} 
                    name="add" 
                    onPress={() => props.navigation.navigate(props.navigateTo, {id: null})} 
                />
                <View style={{...styles.editContainer, marginRight: 10 }}>
                    <RoundButton 
                        show={!props.isEditState && !props.isDeleteState && props.isFridge} 
                        name="edit" 
                        onPress={props.toggleEditState} 
                    />
                    <RoundButton 
                        show={props.isDeleteState} 
                        name="delete" 
                        onPress={props.deleteItems}
                    />
                    <RoundButton 
                        show={props.isEditState} 
                        name="done"
                        onPress={props.updateQuantities}
                    />
                    <RoundButton 
                        show={props.isDeleteState || props.isEditState} 
                        name="cancel"
                        onPress={props.isDeleteState ? props.toggleDeleteState : props.toggleEditState}
                    />
                </View>
            </Animatable.View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainButtons: {
        position: 'absolute',
        bottom: 15,
        right: 6,
        flexDirection: 'row',
    },
    editContainer: {
        flexDirection: 'row'
    },
    toggleButton: { 
        position: 'absolute',
        right: 0,
        bottom: 10,
        zIndex: 5,
        width: 30,
        color: '#333'
    }
});

export default mainButtons;