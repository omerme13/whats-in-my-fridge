import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SettingSwitch from '../SettingsSwitch';
import StyledText from '../UI/StyledText';
import { toggleAmericanUnits } from '../../store/actions/settings';

const settings = props => {
    const areAmericanUnits = useSelector(state => state.settings.areAmericanUnits);
    const [americanUnits, setAmericanUnits] = useState(areAmericanUnits);
    
    return (
        <ScrollView>
            <View style={styles.settings}>
                <View style={styles.settingItem}>
                    <StyledText type="title" style={{textAlign: 'left'}}>Units</StyledText>
                    <SettingSwitch
                        name="Use american units (lbs, oz)"
                        value={americanUnits}
                        setValue={setAmericanUnits}
                        dispatchFunc={toggleAmericanUnits}
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