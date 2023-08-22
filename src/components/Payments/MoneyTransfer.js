import React, { useState } from 'react';

const MoneyTransfer = ({ users, onTransfer, currentUser }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);

    const handleTransfer = () => {
        if (recipient && amount > 0 && currentUser.budget >= amount) {
            onTransfer(currentUser, recipient, amount);
        } else {
            alert("Please check the recipient and amount.");
        }
    };

    return (
        <div className="transfer-container">
            <h2>Transfer Money</h2>
            <select value={recipient} onChange={e => setRecipient(e.target.value)}>
                <option value="" disabled>Select a user</option>
                {users.map(user => (
                    user.id !== currentUser.id && <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <input 
                type="number" 
                value={amount} 
                onChange={e => {
                    const val = parseFloat(e.target.value);
                    setAmount(val);
                }}
                placeholder="Amount"
            />
            <button onClick={handleTransfer}>Transfer</button>
        </div>
    );
};

export default MoneyTransfer;
