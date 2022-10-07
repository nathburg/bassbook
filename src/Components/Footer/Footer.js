import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Footer.css';

export default function Footer() {
  const { isFish, setIsFish } = useContext(UserContext);
  return (
    <div className='theme-footer' onClick={() => setIsFish(!isFish)}>Change Theme</div>
  );
}
