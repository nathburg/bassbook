import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';


export default function Header() {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <div className='header-music'>
      <div className='title-container'>
        <h1>Welcome to Bassbook</h1>
      </div>
      <div className='head-container'>
        <p className='hello'>Hello {user.email}</p>
        <div className='sign-out-container'>
          <button className='sign-out' onClick={() => {
            signOut();
            setUser(null);
          }}>Sign Out</button>
        </div>
        {user && 
      <div className='info-container'>
        <button>
          <Link className='create-post' to="/post/new">Create Post</Link>
        </button>
      </div>}
        {!user &&
      <div className='link-container'>  
        <NavLink to='/auth/sign-in'>Sign In</NavLink>
        <NavLink to='/auth/sign-up'>Sign Up</NavLink>
      </div>
        }
      </div>
    </div>
  );
}

