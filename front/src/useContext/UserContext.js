import React, { createContext, useReducer } from 'react';
import { useEffect } from 'react';

export const UserContext = createContext();

const initialState = {
  user: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        user: null,
      };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  
  useEffect(() => {
    if(localStorage.getItem('user', JSON.stringify(state.user))===null){
      localStorage.setItem('user', JSON.stringify(state.user))
    }
    
  }, [state.user]);

  useEffect(() => {
    // Récupère l'état de l'utilisateur à partir du localStorage lors du chargement de l'application
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
