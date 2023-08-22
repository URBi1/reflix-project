import React from 'react';
import styles from './Landing.module.css';

const User = ({ user, onClick, currentUserId  }) => (
    <div 
        key={user.id} 
        className={styles["user-box"]} 
        style={{ backgroundColor: user.color,
            border: user.id === currentUserId ? '3px solid gold' : 'none' }} 
        onClick={onClick}
    >
        {user.name}
    </div>
);

export default User;
