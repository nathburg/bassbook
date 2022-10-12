import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';


export default function Header() {
  const { user, setUser, isFish } = useContext(UserContext);

  return (
    <div className={`header ${isFish ? 'fish' : 'music music-header'}`}>
      <div className="title-container">
        <h1>Welcome to Bassbook {isFish ? '🐟' : '🎸'}</h1>
      </div>
      {user && (
        <div className="head-container">
          <p className="hello">Hello {user.email}</p>
          <div className="sign-out-container">
            <button
              className="sign-out"
              onClick={() => {
                signOut();
                setUser(null);
              }}
            >
              Sign Out
            </button>
          </div>

          <Link className={`${isFish ? 'fish' : 'music'}`} to="/post/new">
            Create Post
          </Link>
        </div>
      )}
      
      {!user && (
        <div className="link-container">
          <button><NavLink to="/auth/sign-in">Sign In</NavLink></button>
          <NavLink to="/auth/sign-up">Sign Up</NavLink>
        </div>
      )}
    </div>
  );
}

