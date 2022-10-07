import { useState } from 'react';
import { createContext } from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [submit, setSubmit] = useState(true);
  const [isFish, setIsFish] = useState(true);


  
  return <UserContext.Provider value={{ user, setUser, submit, setSubmit, isFish, setIsFish }}>
    {children}
  </UserContext.Provider>;
};

export { UserProvider, UserContext };

//experimental comment