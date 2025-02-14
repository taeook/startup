import React from 'react';
import './profile.css';

export function Profile() {
    return (
        <main>
            <div id="left-column">
                <section id="notifications">
                    <h2>Real-time Notifications</h2>
                    <div id="realtime-notifications">
                        <p>Waiting for new notifications...(Websocket Data)</p>
                    </div>
                </section>
            </div>
            <div id="right-column">
                <section id="profile-info">
                    <h2>Profile Information</h2>
                    <div id="database-profile">
                        <p>Loading user profile data...(Database Data)</p>
                    </div>
                </section>
                <section id="user-reviews">
                    <h2>Your Reviews</h2>
                    <div id="database-user-reviews">
                        <p>Loading your reviews...(Database Data)</p>
                    </div>
                </section>
            </div>
        </main>
    );
}