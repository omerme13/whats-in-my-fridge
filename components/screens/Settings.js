import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SettingSwitch from '../SettingsSwitch';
import StyledText from '../UI/StyledText';
import { toggleAmericanUnits, toggleLongDate } from '../../store/actions/settings';

const settings = props => {
    const areAmericanUnits = useSelector(state => state.settings.areAmericanUnits);
    const isLongDate = useSelector(state => state.settings.isLongDate);
    
    const [americanUnits, setAmericanUnits] = useState(areAmericanUnits);
    const [LongDate, setLongDate] = useState(isLongDate);
    
    return (
        <ScrollView>
            <View style={styles.settings}>
                <View style={styles.settingItem}>
                    <StyledText type="title" style={{textAlign: 'left'}}>Units</StyledText>
                    <SettingSwitch
                        name="Use american units"
                        value={americanUnits}
                        setValue={setAmericanUnits}
                        dispatchFunc={toggleAmericanUnits}
                        description="Use OZ & LBS instead of Litre & KG. Use date format: mm-dd-yy"
                    />
                    <SettingSwitch
                        name="Long date format"
                        value={LongDate}
                        setValue={setLongDate}
                        dispatchFunc={toggleLongDate}
                        description="Use date format: dd-mmm-yyyy"
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