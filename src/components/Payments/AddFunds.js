
import React, { useState } from 'react';

const AddFunds = ({ currentUser, onUpdateUser }) => {
    const [amount, setAmount] = useState("");
    const [creditCard, setCreditCard] = useState("1234567890123456");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate credit card and amount
        if (!creditCard || creditCard.length !== 16 || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Invalid credit card or amount.");
            return;
        }

        const updatedUser = {
            ...currentUser,
            budget: currentUser.budget + parseFloat(amount)
        };

        onUpdateUser(updatedUser);
        alert(`Successfully added $${amount} to your account.`);
        setAmount("");
        setCreditCard("");
    };

    return (
        <div className="add-funds-container">
            <h2>Add Funds</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Credit Card:
                    <input 
                        type="text" 
                        value={creditCard} 
                        onChange={e => setCreditCard(e.target.value)} 
                        placeholder="1234 5678 9012 3456" 
                        maxLength={16}
                    />
                </label>
                <br />
                <label>
                    Amount:
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                        min="0.01" 
                        step="0.01" 
                        placeholder="Enter the amount"
                    />
                </label>
                <br />
                <button type="submit">Deposit</button>
            </form>
        </div>
    );
}

export default AddFunds;