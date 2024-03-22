import React from 'react';

import { firebase } from 'firebase/app';
import 'firebase/messaging';

const NotificationSender = () => {
    const YOUR_SERVER_KEY = 58481872496
    const handleButtonClick = () => {
        const messaging = firebase.messaging();
        messaging
            .getToken()
            .then((currentToken) => {
                if (currentToken) {
                    // You can send a notification to the current user using Firebase Cloud Messaging
                    fetch('https://fcm.googleapis.com/fcm/send', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `key=${YOUR_SERVER_KEY}`, // Replace with your server key
                        },
                        body: JSON.stringify({
                            to: currentToken,
                            notification: {
                                title: 'Button Clicked',
                                body: 'You clicked the button!',
                                click_action: window.location.href,
                            },
                        }),
                    });
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
    };

    return (
        <button onClick={handleButtonClick}>Send Notification</button>
    );
};

export default NotificationSender;
