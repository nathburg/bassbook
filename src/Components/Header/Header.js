import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';


export default function Header() {
  const { user, setUser, isFish, setIsFish } = useContext(UserContext);
  console.log(user);
  return (
    <div className='header-music'>
      <div className='title-container'>
        <h1>Welcome to Bassbook {isFish ? '🐟' : '🎸'}</h1>
      </div>
      {user && 
      <div className='head-container'>
        {/* <div className='info-container'> */}
        <p className='hello'>Hello {user.email}</p>
        <div className='sign-out-container'>
          <button className='sign-out' onClick={() => {
            signOut();
            setUser(null);
          }}>Sign Out</button>
        </div>
        <button>
          <Link className='create-post' to="/post/new">Create Post</Link>
        </button>
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

