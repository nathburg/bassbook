import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';


export default function Header() {
  const { user, setUser, isFish, setIsFish } = useContext(UserContext);
  console.log(user);
  return (
    <div className='fish-header'>
      <div className='fish-title-container'>
        <h1 className='fish-h1'>Welcome to Bassbook {isFish ? '🐟' : '🎸'}</h1>
      </div>
      {user && 
      <div className='fish-head-container'>
        <p className='fish-hello'>Hello {user.email}</p>
        <div className='fish-sign-out-container'>
          <Link className='fish-sign-out' onClick={() => {
            signOut();
            setUser(null);
          }}>Sign Out</Link>
        </div>
        
        <Link className='fish-create-post' to="/post/new">Create Post</Link>
        
      </div>
      }
      {/* </div> */}
      {!user &&
      <div className='link-container'>  
        <NavLink to='/auth/sign-in'>Sign In</NavLink>
        <NavLink to='/auth/sign-up'>Sign Up</NavLink>
      </div>
      }
    </div>
  );
}

