import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Vibration } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const notification = (props) => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState({});

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );

            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync();
            setExpoPushToken(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250],
        });
    };

    const sendPushNotification = async () => {
        setNotification({
            to: expoPushToken,
            sound: "default",
            title: "The title",
            body: "the body!",
            data: { data: "goes here" },
            _displayInForeground: true,
        });

        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notification),
        });

        Vibration.vibrate();
    };

    useEffect(() => {
        (async () => {
            await registerForPushNotificationsAsync();
        })();
    }, []);

    return (
        <View style={styles.notification}>
            <Text>Notification</Text>
            <Button
                title={"Send Notification"}
                onPress={sendPushNotification}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    notification: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default notification;
