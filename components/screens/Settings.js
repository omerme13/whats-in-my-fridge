import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SettingSwitch from '../SettingsSwitch';
import StyledText from '../UI/StyledText';
import { changeFridgeColumns } from '../../store/actions/settings';

const settings = props => {
    const isOneColumn = useSelector(state => state.settings.isOneColumn);
    const [oneFridgeColumn, setOneFridgeColumn] = useState(isOneColumn);

    return (
        <ScrollView>
            <View style={styles.settings}>
                <View style={styles.settingItem}>
                    <StyledText type="title" style={{textAlign: 'left'}}>fridge</StyledText>
                    <SettingSwitch
                        name="Items in one column"
                        value={oneFridgeColumn}
                        setValue={setOneFridgeColumn}
                        dispatchFunc={changeFridgeColumns}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-start',
        // backgroundColor: colors.primaryLightest
    },
    settingItem: {
        width: '100%',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    }
});

export default settings;