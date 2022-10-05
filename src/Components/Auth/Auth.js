import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { authUser, getUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div className="auth-form">
        <label>Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={async () => {
          const resp = await authUser(email, password, type);
          console.log(email, password, type);
          console.log(resp);
        }}>Enter</button>
      </div>  
    </div>
  );
}
