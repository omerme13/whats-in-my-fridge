import React from 'react';
import { View, TouchableNativeFeedback, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native'
import { colors } from '../../utils/variables';

const sideModal = props => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isModalOpen}
        >
            <TouchableWithoutFeedback onPress={props.toggleModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modal}>
                        <View>
                            <TouchableNativeFeedback>
                                <View>
                                    {props.children}
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    modal: {
        marginTop: 55,
        backgroundColor: colors.primaryLightest,
        width: "50%",
        marginLeft: "auto",
        elevation: 3
    }
});

export default sideModal;
