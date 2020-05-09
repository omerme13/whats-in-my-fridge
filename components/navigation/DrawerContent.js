import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { colors } from '../../utils/variables';

import StyledText from '../UI/StyledText';
const drawerContent = props => {
    return (
        <DrawerContentScrollView style={styles.drawerContent}>
            <View style={styles.iconContainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.icon}
                />
                <StyledText style={styles.title}>What's In My Fridge</StyledText>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
};

const styles = StyleSheet.create({
    drawerContent: {
    },
    icon: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#fff',
    },
    iconContainer: {
        marginTop: -50,
        marginBottom: 10,
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 60,
        borderBottomColor: colors.primary,
        borderBottomWidth: 8,
        backgroundColor: colors.primaryDarkest,
    }
});

export default drawerContent;