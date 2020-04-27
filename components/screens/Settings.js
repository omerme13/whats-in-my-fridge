import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import StyledText from '../StyledText';
import SettingSwitch from '../SettingsSwitch';
import { changeFridgeColumns } from '../../store/actions/settings';

const settings = props => {
    const [oneFridgeColumn, setOneFridgeColumn] = useState(false);

    return (
        <SafeAreaView style={styles.settings}>
            <View style={{ flex: 1 }}>
                <StyledText type="title">
                    Settings
                </StyledText>
            </View>
            <View style={{ flex: 4 }}>
                <SettingSwitch
                    name="Fridge items in one column"
                    value={oneFridgeColumn}
                    setValue={setOneFridgeColumn}
                    dispatchFunc={changeFridgeColumns}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-around',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

export default settings;