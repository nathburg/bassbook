import { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser, getUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser, isFish } = useContext(UserContext);
  function getNewUser() {
    const currentUser = getUser();
    setUser(currentUser);
  }
  getNewUser();
  
  if (user) {
    return <Redirect to='/topic' />;
  }
  
  return (
    <div className='auth-form-container'>
      <div className={`auth-form ${isFish ? 'fish' : 'music'}`}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={async () => {
          await authUser(email, password, type);
          getNewUser();
        }}>Enter</button>
      </div> 
    </div> 
  
  );
}


