import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User'; // импорт вынесенного компонента User
import styles from './Landing.module.css';

const Landing = ({ allUsers, onUserSelect, currentUser  }) => {
    const navigate = useNavigate();

    const handleUserClick = (userId) => {
        const selectedUser = allUsers.find(user => user.id === userId);
        onUserSelect(selectedUser);  // передаем выбранного пользователя в родительский компонент
        navigate('/catalog');
    };

    return (
        <div className={styles["landing-container"]}>
            <h1>Who's watching?</h1>
            <div className={styles["users-list"]}>
                {allUsers.map(user => (
                    <User key={user.id} user={user} onClick={() => handleUserClick(user.id)} currentUserId={currentUser?.id}/>
                ))}
            </div>
        </div>
    );
}

export default Landing;
