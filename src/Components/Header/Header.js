import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


export default function Header() {
  const { user } = useContext(UserContext);
  
  return (
    <div>
      <h1>Welcome to Bassbook</h1>
      {user && <div>Hello {user.email}</div>}
    </div>
  );
}
