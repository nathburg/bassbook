import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';


export default function Header() {
  const { user, setUser, isFish, setIsFish } = useContext(UserContext);
  
  return (
    <div className={`${isFish ? 'bg-fish' : 'bg-music'}`}>
      <h1>Welcome to Bassbook</h1>
      {user && 
      <div>
        <div>Hello {user.email}</div>
        <Link to="/post/new">Create Post</Link>
        <div className='sign-out' onClick={() => {
          signOut();
          setUser(null);
        }}>Sign Out</div>
      </div>}
      <button onClick={() => setIsFish(!isFish)}>Change Theme</button>
      {!user &&
      <div className='link-container'>  
        <NavLink to='/auth/sign-in'>Sign In</NavLink>
        <NavLink to='/auth/sign-up'>Sign Up</NavLink>
      </div>
      }
    </div>
  );
}
