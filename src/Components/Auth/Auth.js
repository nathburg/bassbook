import { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser, getUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  function getNewUser() {
    const currentUser = getUser();
    setUser(currentUser);
  }
  getNewUser();
  
  if (user) {
    return <Redirect to='/' />;
  }
  
  return (
    <div>
      <div className="auth-form music">
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={async () => {
          await authUser(email, password, type);
          getNewUser();
        }}>Enter</button>
      </div>  
    </div>
  );
}
