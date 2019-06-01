import React from 'react';

const WishContext = React.createContext({
  name: '',
  userID: 1,
  history: '',
  register:(username, email, password)=>{},
  login: (email, userId) => { },
  logout: () => { },
  getHistory: (history) => { }
});

export default WishContext;