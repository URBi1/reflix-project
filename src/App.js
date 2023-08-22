import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Landing from './components/Landing/Landing';
import { users } from './utils/userData';
import Catalog from './components/Catalog/Catalog';
import MovieDetail from './components/MovieDetail/MovieDetail';
import AddFunds from './components/Payments/AddFunds';
import MoneyTransfer from './components/Payments/MoneyTransfer';
import Navbar from './components/Navbar/Navbar';


function App() {

  const [currentUser, setCurrentUser] = useState(users[0]);
  const [allUsers, setAllUsers] = useState(users);


  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    
    const updatedUsers = allUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
    setAllUsers(updatedUsers);
  };
  
  const handleMoneyTransfer = (fromUser, toUserId, amount) => {
    const toUser = allUsers.find(user => user.id === parseInt(toUserId));

    if (!toUser) {
        alert("Recipient not found!");
        return;
    }

    // Deduct money from current user
    fromUser.budget -= amount;
    // Add money to the recipient
    toUser.budget += amount;

    const updatedUsers = allUsers.map(user => {
        if (user.id === fromUser.id) {
            return fromUser;
        }
        if (user.id === toUser.id) {
            return toUser;
        }
        return user;
    });

    setAllUsers(updatedUsers);
    setCurrentUser(fromUser);  // Update current user with new budget
};



  return (
    <Router>
      <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Landing  currentUser={currentUser} onUserSelect={setCurrentUser} allUsers={allUsers}/>} />
          <Route path="/catalog" element={<Catalog user={currentUser} allUsers={allUsers} onUserUpdate={handleUserUpdate}/>} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/add-funds" element={<AddFunds currentUser={currentUser} onUpdateUser={handleUserUpdate} />} />
          <Route path="/money-transfer" element={<MoneyTransfer currentUser={currentUser} users={allUsers} onTransfer={handleMoneyTransfer} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
